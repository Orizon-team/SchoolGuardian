"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faIdBadge,
} from "@fortawesome/free-regular-svg-icons";
import React from "react";
import { FillButton } from "../ui/button";
import { tree } from "next/dist/build/templates/app-page";

interface ProfileCardProps {
  name: string;
  email: string;
  role: string;
  width?: string;
}

interface ProfileCardModalProps extends ProfileCardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileCardModal({
  name,
  email,
  role,
  width = "w-80",
  isOpen,
  onClose,
}: ProfileCardModalProps) {
  if (!isOpen) return null; // No renderiza el modal si no está abierto

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // Cierra el modal al hacer clic fuera del contenido
    >
      <div
        className={`bg-secondaryOri border-2 border-greyOri p-5 rounded-lg shadow-lg ${width}`}
        onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del modal cierre el modal
      >
        <h1 className="text-xl font-bold mb-2">Perfil</h1>
        <p className="text-sm text-greyOri-400 mb-6">
          Información de tu cuenta
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <FontAwesomeIcon
              icon={faUser}
              className="text-primaryOri w-8 h-8"
            />
            <div className="flex flex-col">
              <label className="text-sm-ori text-primaryOri font-bold">
                {name}
              </label>
              <label className="text-greyOri-400 text-sm">Profesor</label>
            </div>
          </div>
          <div className="flex gap-4 items-center mb-4">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-primaryOri w-8 h-8"
            />
            <div className="flex flex-col">
              <label className="text-greyOri-400 text-sm ">Correo electrónico</label>
              <label className="text-sm text-primaryOri font-bold">
                {email}
              </label>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <FillButton
              text="Editar perfil"
              isFlex={true}
              isFullWidth={true}
              isWithIcon={false}
             
            />
          </div>
        </div>
      </div>
    </div>
  );
}
