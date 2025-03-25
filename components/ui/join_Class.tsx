"use client";

import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { TextField, TextFieldForPassword } from "@/components/ui/text_field";
import { FillButton } from "@/components/ui/button";

interface JoinClassProps {
  onClose: () => void;
}

export function JoinClass({ onClose }: JoinClassProps) {

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <section className={`bg-secondaryOri border-2 border-greyOri p-5 rounded-lg shadow-lg w-96`}
        onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Unirse a una clase</h1>
          <FontAwesomeIcon icon={faXmark} className="text-primaryOri w-5 h-5 cursor-pointer hover:opacity-80" onClick={onClose} />
        </div>

        <p className="text-sm-ori text-greyOri-400 mb-4">
          Ingresa el código de clase proporcionado por tu profesor
        </p>

        <div className="flex flex-col gap-4">
          <TextField text="" placeHolder="Ingresa el código de la clase" isWithIcon={false} />

          <div className="flex justify-between items-center">
            <a
              role="button"
              tabIndex={0}
              className="font-bold cursor-pointer hover:text-greyOri-950"
              onClick={onClose}
              onKeyDown={(e) => e.key === 'Enter' && onClose()}
            >
              Cerrar
            </a>
            <FillButton text="Unirse" paddingX="px-10" paddingY="py-3" isWithIcon={false} />
          </div>
        </div>
      </section>
    </div>
  );
}