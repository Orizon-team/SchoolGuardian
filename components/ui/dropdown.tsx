"use client";

import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

interface DropdownProps {
  placeholder: string;
  genres: string[];
}

export function Dropdown({ placeholder, genres }: DropdownProps) {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
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
          <FontAwesomeIcon icon={faAngleDown} className="text-greyOri-400 h-3.5 w-3.5 ml-2" />
        </button>
        {isOpen && (
          <ul className="absolute mt-2 rounded-sm border border-greyOri-200 w-full">
            {genres.map((item) => (
              <li
                key={item}
                onClick={() => handleSelectChange(item)}
                className="py-2 px-4 bg-secondaryOri hover:bg-primaryOri text-greyOri-400 hover:text-secondaryOri cursor-pointer"
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
