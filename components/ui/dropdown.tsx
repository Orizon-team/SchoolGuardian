"use client";

import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

interface DropdownProps {
  placeholder: string;
  genres: string[];
  onSelect?: (value: string) => void; // Nueva prop para manejar selección
  selectedValue?: string; // Opcional: valor controlado desde el padre
}

export function Dropdown({ placeholder, genres, onSelect, selectedValue: externalSelectedValue }: DropdownProps) {
  const [internalSelectedValue, setInternalSelectedValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Determina si el valor es controlado o no
  const isControlled = externalSelectedValue !== undefined;
  const selectedValue = isControlled ? externalSelectedValue : internalSelectedValue;

  const handleSelectChange = (value: string) => {
    if (!isControlled) {
      setInternalSelectedValue(value);
    }
    setIsOpen(false);
    onSelect?.(value); // Notifica al padre
  };

  // Cierra el dropdown si se hace clic fuera de él
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-center py-5">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 w-full min-w-[200px] flex items-center justify-between rounded-sm border border-greyOri-200 bg-transparent text-greyOri-400 text-left"
        >
          <span>{selectedValue || placeholder}</span>
          <FontAwesomeIcon
            icon={faAngleDown}
            className={`text-greyOri-400 h-3.5 w-3.5 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        {isOpen && (
          <ul className="absolute z-10 mt-1 rounded-sm border border-greyOri-200 w-full bg-white shadow-lg max-h-60 overflow-auto">
            {genres.map((item) => (
              <li
                key={item}
                onClick={() => handleSelectChange(item)}
                className={`py-2 px-4 hover:bg-primaryOri hover:text-secondaryOri cursor-pointer ${item === selectedValue ? "bg-primaryOri text-secondaryOri" : "text-greyOri-400"
                  }`}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}