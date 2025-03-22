"use client";

import React, { ReactElement, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

interface textFieldprops {
  text: string;
  placeHolder: string;
  isWithIcon: boolean;
  icon?: React.ReactElement<any>;
}

export function TextField({
  text,
  placeHolder,
  isWithIcon,
  icon,
}: textFieldprops) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor="email2"
        className="text-sm text-primaryOri font-bold"
      >
        {text}
      </label>
      <div className="relative flex items-center mt-2">
        <input
          type="text"
          id="email2"
          placeholder={placeHolder}
          className="w-full pl-10 text-primaryOri border border-greyOri-300 rounded-sm bg-transparent h-12"
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
}: textFieldprops) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="flex flex-col">
      <label
        htmlFor="password"
        className="text-sm text-navy-700 dark:text-primaryOri font-bold"
      >
        {text}
      </label>
      <div className="relative flex items-center mt-2">
        <input
          type={isPasswordVisible ? "text" : "password"} // Cambia entre texto y contraseña
          id="password"
          placeholder={placeHolder}
          className="items-center w-full pr-10 text-primaryOri border border-greyOri-300 rounded-sm bg-transparent h-12"
        />
        {isWithIcon && (
          <span
            onClick={() => setIsPasswordVisible(!isPasswordVisible)} // Alterna la visibilidad
            className="absolute right-3 cursor-pointer"
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