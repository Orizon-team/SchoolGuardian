"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { TextField } from "@/components/ui/text_field";
import { FillButton } from "@/components/ui/button";
import { joinClassRequest } from "@/lib/api/fetch/join_class_request";
import { SuccesModal, LoadingModal, ErrorModal } from "@/components/modals/status_modal";

interface JoinClassProps {
  onClose: () => void;
}

export function JoinClass({ onClose }: JoinClassProps) {
  const [codigoClase, setCodigoClase] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleJoinClass = async () => {
    if (!codigoClase.trim()) {
      setErrorMessage("Por favor ingresa un código de clase");
      setShowError(true);
      return;
    }

    setShowLoading(true);
    setErrorMessage("");

    try {
      const success = await joinClassRequest(codigoClase);
      if (success) {
        setShowSuccess(true);
      } else {
        setErrorMessage("Error al unirse a la clase. Verifica el código e intenta nuevamente.");
        setShowError(true);
      }
    } catch (err) {
      setErrorMessage("Ocurrió un error inesperado. Por favor intenta más tarde.");
      setShowError(true);
      console.error(err);
    } finally {
      setShowLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    onClose();
  };

  const handleCloseLoading = () => {
    setShowLoading(false);
  };

  const handleCloseError = () => {
    setShowError(false);
  };

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
          <TextField
            text=""
            placeHolder="Ingresa el código de la clase"
            isWithIcon={false}
            onChange={(e) => {
              setCodigoClase(e.target.value);
              setErrorMessage("");
            }} 
            value={codigoClase}
          />

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
            <FillButton 
              text="Unirse" 
              paddingX="px-10" 
              paddingY="py-3" 
              isWithIcon={false} 
              onClick={handleJoinClass}
            />
          </div>
        </div>
      </section>
      <LoadingModal
        isOpen={showLoading}
        onClose={handleCloseLoading}
        description="Procesando tu solicitud..."
      />

      <SuccesModal
        isOpen={showSuccess}
        onClose={handleCloseSuccess}
        description="¡Te has unido a la clase exitosamente!"
        showCloseButton={true}
      />

      <ErrorModal
        isOpen={showError}
        onClose={handleCloseError}
        description={errorMessage}
      />
    </div>
  );
}