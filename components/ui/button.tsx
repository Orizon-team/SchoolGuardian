import { ArrowDownCircleIcon, HomeIcon } from "@heroicons/react/24/outline";
import React, { ReactElement } from "react";

interface buttonProps {
  text: string;
  isWithIcon: boolean;
  icon?: React.ReactElement<any>;
}

export function FillButton({ text, isWithIcon, icon }: buttonProps) {
  return (
    <div>
      <button className="flex items-center gap-x-2 bg-primaryOri text-sm-ori text-secondaryOri font-bold rounded-lg py-4 px-20 hover:bg-greyOri-900">
        {isWithIcon &&
          icon &&
          React.cloneElement(icon, { className: "h-4 w-5 bg-transparent" })}
        {text}
      </button>
    </div>
  );
}

export function OutlineButton_white({ text, isWithIcon, icon }: buttonProps) {
  return (
    <div>
      <button className="flex items-center gap-x-2 border-2 border-secondaryOri text-sm-ori text-secondaryOri font-bold rounded-lg py-4 px-20 hover:bg-greyOri-300 hover:border-greyOri-300 hover:text-primaryOri">
      {isWithIcon &&
          icon &&
          React.cloneElement(icon, { className: "h-4 w-5 bg-transparent" })}
        {text}
      </button>
    </div>
  );
}

export function SpecialRedButton({ text, isWithIcon, icon }: buttonProps) {
  return(
     <div>
        <button className="flex items-center gap-x-2 border border-secondaryOri text-sm-ori text-errostate font-bold rounded-lg py-4 px-20 hover:bg-errostate hover:border-errostate hover:text-secondaryOri">
        {isWithIcon &&
          icon &&
          React.cloneElement(icon, { className: "h-4 w-5 bg-transparent" })}
        {text}
        </button>
     </div>
  );
}

export function SpecialGreenButton({ text, isWithIcon, icon }: buttonProps) {
  return(
     <div>
        <button className="flex items-center gap-x-2 border border-secondaryOri text-sm-ori text-successstate font-bold rounded-lg py-4 px-20 hover:bg-successstate hover:border-successstate hover:text-white">
        {isWithIcon &&
          icon &&
          React.cloneElement(icon, { className: "h-5 w-5 bg-transparent" })}
        {text}
        </button>
     </div>
  );
}