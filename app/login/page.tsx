"use client";

import react, { useState } from "react";
import {
  ErrorModal,
  LoadingModal,
  SuccesModal,
} from "@/components/modals/status_modal";
import { loginUser } from "@/lib/api/user_services";
import { FillButton } from "@/components/ui/button";
import { TextField, TextFieldForPassword } from "@/components/ui/text_field";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [token, setToken] = useState<string | null>(null);

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    // Validación de campos vacíos
    if (!email || !contrasena) {
      setErrorMessage("Por favor, completa todos los campos.");
      setIsErrorModalOpen(true);
      return;
    }

    setIsLoadingModalOpen(true); // Muestra el modal de carga
    try {
      const result = await loginUser(email, contrasena);
      setIsLoadingModalOpen(false); // Oculta el modal de carga

      if (result) {
        setToken(result);
        setIsSuccessModalOpen(true); // Muestra el modal de éxito
        console.log("Token recibido:", result);
      } else {
        setErrorMessage(
          "Credenciales incorrectas. Por favor, verifica tus datos."
        );
        setIsErrorModalOpen(true); // Muestra el modal de error
        console.error("Error al iniciar sesión.");
      }
    } catch (error) {
      setIsLoadingModalOpen(false); // Oculta el modal de carga
      setErrorMessage("Error al realizar la solicitud. Intenta nuevamente.");
      setIsErrorModalOpen(true); // Muestra el modal de error
      console.error("Error al realizar la solicitud:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/study.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-md w-full bg-secondaryOri rounded-xl shadow-lg p-8">
        <h2 className="text-2xl-ori font-bold text-gray-900 mb-2 text-center">
          Inicio de sesión
        </h2>
        <p className="text-sm-ori text-gray-600 text-center mb-5">
          Ingresa tus datos para acceder a tu cuenta
        </p>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault(); // Evita el comportamiento predeterminado del formulario
            handleLogin();
          }}
        >
          <TextField
            text="Correo electrónico"
            placeHolder="Tu correo"
            isWithIcon={false}
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Actualiza el estado de email
          />
          <div className="flex justify-end">
            <Link
              href="https://assists-api.onrender.com/cambiarContrasena.html"
              className="text-sm-ori text-greyOri-500 hover:text-greyOri-950"
            >
              Olvidé mi contraseña
            </Link>
          </div>
          <TextFieldForPassword
            text="Contraseña"
            placeHolder="Tu contraseña"
            isWithIcon={true}
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)} // Actualiza el estado de contrasena
          />
          <FillButton
            text="Iniciar Sesión"
            isWithIcon={false}
            isFullWidth={true}
            isFlex={false}
            onClick={(e) => {
              e.preventDefault(); // Evita el comportamiento predeterminado del formulario
              handleLogin();
            }}
          />
        </form>

        <div className="mt-6 text-center text-sm-ori text-greyOri-500">
          ¿No tienes una cuenta?
          <Link href="/sign-up" className="text-primaryOri font-medium p-1">
            Regístrate
          </Link>
        </div>
      </div>

      {/* Modales */}
      {isLoadingModalOpen && (
        <LoadingModal
          isOpen={isLoadingModalOpen}
          description="Iniciando sesión..."
          onClose={() => setIsLoadingModalOpen(false)}
        />
      )}
      {isSuccessModalOpen && (
        <SuccesModal
          isOpen={isSuccessModalOpen}
          description="Inicio de sesión exitoso."
          onClose={() => setIsSuccessModalOpen(false)}
        />
      )}
      {isErrorModalOpen && (
        <ErrorModal
          isOpen={isErrorModalOpen}
          description={errorMessage || "Error desconocido"}
          onClose={() => setIsErrorModalOpen(false)} // Solo se cierra cuando el usuario hace clic en cerrar
        />
      )}
    </div>
  );
}
