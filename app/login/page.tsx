"use client";

import { useRouter } from "next/navigation";
import react, { useEffect, useState } from "react";
import {
  ErrorModal,
  LoadingModal,
  SuccesModal,
  WarningModal,
} from "@/components/modals/status_modal";
import { FillButton } from "@/components/ui/button";
import { TextField, TextFieldForPassword } from "@/components/ui/text_field";
import Link from "next/link";
import { loginUserRequest } from "@/lib/api/fetch/user_request";

export default function Login() {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [token, setToken] = useState<string | null>(null);

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

  const router = useRouter();

  // useEffect(() => {
  //   console.log("Hola esto es el useEffect del login");
  //   const login = async () => {
  //     const UserToken = await loginUserRequest("uxi@gmail.com", "123");
  //     if (UserToken) {
  //       console.log("Token recibido:", UserToken);
  //       setToken(token);
  //     } else {
  //       console.error("Error al iniciar sesión. Verifica las credenciales.");
  //     }
  //   };
  //   login();
  // }, []);

  const handleLogin = async () => {
    if (!email || !contrasena) {
      setErrorMessage("Por favor, completa todos los campos.");
      setIsErrorModalOpen(true);
      return;
    }

    setIsLoadingModalOpen(true);
    try {
      const result = await loginUserRequest(email, contrasena);
      setIsLoadingModalOpen(false);

      if (result) {
        setToken(result);
        setIsSuccessModalOpen(true);
        console.log("Token recibido:", result);

        const usuarioString = localStorage.getItem("usuario");

        if (usuarioString) {
          const usuario = JSON.parse(usuarioString);
          const tipo = usuario.id_tipo;

          if (tipo === 1) {
            console.log("Usuario tipo 1: Administrador");
            router.push("/dashboard/teacher_dashboard");
          } else if (tipo === 2) {
            console.log("Usuario tipo 2: Estudiante");
            router.push("/dashboard/student_dashboard");
          } else {
            console.log("Tipo de usuario desconocido.");
          }
        } else {
          console.log("No se encontró el usuario en localStorage.");
        }
      } else {
        setErrorMessage(
          "Credenciales incorrectas. Por favor, verifica tus datos."
        );
        setIsErrorModalOpen(true);
        console.error("Error al iniciar sesión.");
      }
    } catch (error) {
      setIsLoadingModalOpen(false);
      setErrorMessage("Error al realizar la solicitud. Intenta nuevamente.");
      setIsErrorModalOpen(true);
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
      {isWarningModalOpen && (
        <WarningModal
          isOpen={isWarningModalOpen}
          description="Has alcanzado el límite de intentos."
          onClose={() => setIsWarningModalOpen(false)}
        />
      )}
    </div>
  );
}
