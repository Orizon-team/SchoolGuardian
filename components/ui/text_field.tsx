"use client";

import React, { ReactElement, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

interface textFieldprops {
  text: string;
  placeHolder: string;
  isWithIcon: boolean;
  icon?: React.ReactElement<any>;
  isBold?: boolean; // Nuevo booleano opcional para activar el modo bold
  value: string; // Nuevo prop para el valor del input
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Nuevo prop para manejar cambios
}

export function TextField({
  text,
  placeHolder,
  isWithIcon,
  icon,
  isBold = false, // Valor por defecto: false
  value,
  onChange,
}: textFieldprops) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor="email2"
        className={`text-sm text-primaryOri ${isBold ? "font-bold" : ""}`} // Aplica font-bold si isBold es true
      >
        {text}
      </label>
      <div className="relative flex items-center mt-2">
        <input
          type="text"
          id="email2"
          placeholder={placeHolder}
          value={value}
          onChange={onChange}
          className={`w-full ${
            isWithIcon && icon ? "pl-10" : "pl-3"
          } text-primaryOri border border-greyOri-300 rounded-sm bg-transparent h-12`}
        />
        {isWithIcon &&
          icon &&
          React.cloneElement(icon, {
            className: "absolute left-3 h-5 w-5 text-primaryOri",
          })}
      </div>
    </div>
  );
}

export function TextFieldForPassword({
  text,
  placeHolder,
  isWithIcon,
  isBold = false, // Valor por defecto: false
  value,
  onChange,
}: textFieldprops) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="flex flex-col">
      <label
        htmlFor="password"
        className={`text-sm text-navy-700 dark:text-primaryOri ${
          isBold ? "font-bold" : ""
        }`} // Aplica font-bold si isBold es true
      >
        {text}
      </label>
      <div className="relative flex items-center mt-2">
        <input
          type={isPasswordVisible ? "text" : "password"} // Cambia entre texto y contraseña
          id="password"
          placeholder={placeHolder}
          value={value} // Asigna el valor dinámico
          onChange={onChange} // Maneja los cambios en el input
          className="items-center w-full pr-10 text-primaryOri border border-greyOri-300 rounded-sm bg-transparent h-12"
        />
        {isWithIcon && (
          <span
            onClick={() => setIsPasswordVisible(!isPasswordVisible)} // Alterna la visibilidad
            className="absolute right-3 bottom-2 cursor-pointer"
          >
            {isPasswordVisible ? (
              <FontAwesomeIcon
                icon={faEye} // Ícono de ojo abierto
                className="h-5 w-5 text-primaryOri"
              />
            ) : (
              <FontAwesomeIcon
                icon={faEyeSlash} // Ícono de ojo cerrado
                className="h-5 w-5 text-primaryOri"
              />
            )}
          </span>
        )}
      </div>
    </div>
  );
}


export function TimeField({
  text,
  value,
  onChange,
  isBold = false,
}: Omit<textFieldprops, "placeHolder" | "isWithIcon" | "icon">) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor="time"
        className={` text-sm text-primaryOri ${isBold ? "font-bold" : ""}`}
      >
        {text}
      </label>
      <div className="relative flex items-center mt-2">
        <input
          type="time" 
          id="time"
          value={value}
          onChange={onChange}
          className="w-full pl-3 text-primaryOri border border-greyOri-300 rounded-sm bg-transparent h-12"
        />
      </div>
    </div>
  );
}