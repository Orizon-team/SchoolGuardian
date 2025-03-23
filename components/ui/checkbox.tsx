"use client";

import { ArrowDownCircleIcon, HomeIcon } from "@heroicons/react/24/outline";
import React, { ReactElement } from "react";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface CheckboxProps {
  label?: string
  checked?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  id?: string
}

export function Checkbox({ label, checked, onChange, id = "checkbox-black" }: CheckboxProps) {
  return (
    <div className="inline-flex items-center">
      <label className="relative flex cursor-pointer items-center p-3" htmlFor={id}>
        <input
          type="checkbox"
          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-black checked:bg-black hover:before:opacity-10"
          id={id}
          checked={checked}
          onChange={onChange}
        />
        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
          <FontAwesomeIcon icon={faCheck} className="h-3.5 w-3.5" />
        </div>
      </label>
      {label && <span className="ml-2">{label}</span>}
    </div>
  );
}