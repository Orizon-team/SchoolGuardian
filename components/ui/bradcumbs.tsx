import React from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export function BreadCumb() {
  return (
    <div className="flex items-center gap-2 text-primaryOri text-sm">
      <a href="#" className="hover:text-greyOri-400">Inicio</a>
      <ChevronRightIcon className="h-4 w-4 text-gray-600" />
      <a href="#" className="hover:text-greyOri-400">Usuarios</a>
      <ChevronRightIcon className="h-4 w-4 text-gray-600" />
      <a href="#" className="hover:text-greyOri-400">Crear usuario</a>
    </div>
  );
}