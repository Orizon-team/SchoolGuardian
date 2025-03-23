import { ArrowDownCircleIcon, HomeIcon } from "@heroicons/react/24/outline";
import React, { ReactElement } from "react";

interface buttonProps {
  text: string;
  isWithIcon: boolean;
  icon?: React.ReactElement<any>;
  paddingX?: string; // Nueva propiedad para el padding horizontal
  onClick?: () => void; // Función que se ejecutará al hacer clic
}

export function FillButton({ text, isWithIcon, icon, paddingX = "px-20", onClick }: buttonProps) {
  return (
    <div>
      <button
        onClick={onClick}
        className={`flex items-center gap-x-2 bg-primaryOri text-sm-ori text-secondaryOri font-bold rounded-lg py-4 ${paddingX} hover:bg-greyOri-900`}
      >
        {isWithIcon &&
          icon &&
          React.cloneElement(icon, { className: "h-4 w-5 bg-transparent" })}
        {text}
      </button>
    </div>
  );
}

export function OutlineButton({ text, isWithIcon, icon, paddingX = "px-20", onClick }: buttonProps) {
  return (
    <div>
      <button
        onClick={onClick}
        className={`flex items-center gap-x-2 bg-transparent text-sm-ori text-primaryOri border-2 border-greyOri-400 font-bold rounded-lg py-4 ${paddingX} hover:bg-greyOri-400`}
      >
        {isWithIcon &&
          icon &&
          React.cloneElement(icon, { className: "h-4 w-5 bg-transparent" })}
        {text}
      </button>
    </div>
  );
}

export function OutlineButton_white({ text, isWithIcon, icon, onClick }: buttonProps) {
  return (
    <div>
      <button
        onClick={onClick}
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

export function SpecialRedButton({ text, isWithIcon, icon, onClick }: buttonProps) {
  return (
    <div>
      <button
        onClick={onClick}
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

export function SpecialGreenButton({ text, isWithIcon, icon, onClick }: buttonProps) {
  return (
    <div>
      <button
        onClick={onClick}
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