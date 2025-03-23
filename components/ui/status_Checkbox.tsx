"use client";

import React from "react";

interface StatusCheckboxProps {
  label: string;
  color: "green" | "yellow" | "red";
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function StatusCheckbox({
  label,
  color,
  checked,
  onChange,
}: StatusCheckboxProps) {
  const colorStyles = {
    green: "text-greenOri-400 border-greenOri-400 checked:bg-greenOri-400",
    yellow: "text-yellowOri-400 border-yellowOri-400 checked:bg-yellowOri   -400",
    red: "text-redOri-500 border-redOri-500 checked:bg-redOri-500",
  };

  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={`h-5 w-5 border-2 rounded-full appearance-none cursor-pointer ${colorStyles[color]} 
          checked:ring-2 checked:ring-offset-2 transition-all`}
      />
      <span className={`${colorStyles[color].split(" ")[0]} font-bold text-sm`}>
        {label}
      </span>
    </label>
  );
}
