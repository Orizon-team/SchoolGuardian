import { ArrowDownCircleIcon, HomeIcon } from "@heroicons/react/24/outline";
import React, { ReactElement } from "react";

interface buttonProps {
  text: string;
  isWithIcon: boolean;
  icon?: React.ReactElement<any>;
  paddingX?: string; // Nueva propiedad para el padding horizontal
  paddingY?: string; // Nueva propiedad para el padding horizontal
  isFullWidth?: boolean; // Nueva propiedad para determinar si es w-full
  isFlex?: boolean; // Nueva propiedad para determinar si es flex e items-center
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; // Función que se ejecutará al hacer clic
  disabled?: boolean; // Nueva propiedad para deshabilitar el botón
}

export function FillButton({
  text,
  isWithIcon,
  icon,
  paddingX = "px-20",
  paddingY = "py-4",
  isFullWidth = false,
  isFlex = true,
  onClick,
  disabled = false, // Propiedad para deshabilitar el botón
}: buttonProps) {
  return (
    <div>
      <button
        onClick={disabled ? undefined : onClick} // Ocultar onClick si está deshabilitado
        className={`${isFullWidth ? "w-full" : ""} ${
          isFlex ? "flex items-center" : ""
        } gap-x-2 ${
          disabled
            ? "bg-greyOri-400 text-greyOri-600 cursor-not-allowed" // Estilo para botón deshabilitado
            : "bg-primaryOri text-secondaryOri hover:bg-greyOri-900"
        } text-sm-ori font-bold rounded-lg ${paddingY} ${paddingX}`}
        disabled={disabled} // Deshabilitar el botón
      >
        {isWithIcon &&
          icon &&
          React.cloneElement(icon, { className: "h-4 w-5 bg-transparent" })}
        {text}
      </button>
    </div>
  );
}

export function OutlineButton({ text, isWithIcon, icon, paddingX = "px-20", paddingY = "py-4", onClick }: buttonProps) {
  return (
    <div>
      <button
        onClick={onClick}
        className={`flex items-center gap-x-2 bg-transparent text-sm-ori text-primaryOri border-2 border-greyOri-400 font-bold rounded-lg ${paddingY} ${paddingX} hover:bg-greyOri-400`}
      >
        {isWithIcon &&
          icon &&
          React.cloneElement(icon, { className: "h-4 w-5 bg-transparent" })}
        {text}
      </button>
    </div>
  );
}

export function OutlineButton_white({
  text,
  isWithIcon,
  icon,
  onClick,
}: buttonProps) {
  return (
    <div>
      <button
        onClick={onClick} // Maneja el evento onClick
        className="flex items-center gap-x-2 border-2 border-secondaryOri text-sm-ori text-secondaryOri font-bold rounded-lg py-4 px-20 hover:bg-greyOri-300 hover:border-greyOri-300 hover:text-primaryOri"
      >
        {isWithIcon &&
          icon &&
          React.cloneElement(icon, { className: "h-4 w-5 bg-transparent" })}
        {text}
      </button>
    </div>
  );
}

export function SpecialRedButton({
  text,
  isWithIcon,
  icon,
  onClick,
}: buttonProps) {
  return (
    <div>
      <button
        onClick={onClick} // Maneja el evento onClick
        className="flex items-center justify-center gap-x-2 border border-greyOri-300 text-sm-ori text-errostate font-bold rounded-lg py-2 px-2 hover:bg-errostate hover:border-errostate hover:text-secondaryOri"
      >
        {isWithIcon &&
          icon &&
          React.cloneElement(icon, { className: "h-4 w-4 bg-transparent" })}
        {text}
      </button>
    </div>
  );
}

export function SpecialGreenButton({
  text,
  isWithIcon,
  icon,
  onClick,
}: buttonProps) {
  return (
    <div>
      <button
        onClick={onClick} // Maneja el evento onClick
        className="flex items-center justify-center gap-x-2 border border-greyOri-300 text-sm-ori text-successstate font-bold rounded-lg py-2 px-2 hover:bg-successstate hover:border-successstate hover:text-white"
      >
        {isWithIcon &&
          icon &&
          React.cloneElement(icon, { className: "h-4 w-4 bg-transparent" })}
        {text}
      </button>
    </div>
  );
}