"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchFieldProps {
  placeHolder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export function SearchField({ placeHolder, onChange, value }: SearchFieldProps) {
  return (
    <div className="w-full flex flex-col">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder={placeHolder}
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primaryOri focus:border-primaryOri shadow-sm transition-all"
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-3 h-5 w-5 text-gray-400"
        />
      </div>
    </div>
  );
}
