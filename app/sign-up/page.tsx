"use client";
import {useRouter} from "next/navigation";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import { TextField, TextFieldForPassword } from "@/components/ui/text_field";
import { FillButton } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { registerUserRequest } from "@/lib/api/fetch/user_request";
import {
  SuccesModal,
  ErrorModal,
  LoadingModal,
} from "@/components/modals/status_modal";

export default function SignUp() {
  const [selectedRole, setSelectedRole] = useState("profesor");
  const isProfesor = selectedRole === "profesor";

  // Estados para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");

  // Estados para los modales
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !email || !contrasena || !confirmarContrasena) {
      setErrorMessage("Por favor, completa todos los campos.");
      setIsErrorModalOpen(true);
      return;
    }

    if (contrasena !== confirmarContrasena) {
      setErrorMessage("Las contraseñas no coinciden.");
      setIsErrorModalOpen(true);
      return;
    }

    const tipoUsuario = isProfesor ? 1 : 2;

    setIsLoadingModalOpen(true);

    try {

      const newUserCreated = await registerUserRequest(
        nombre,
        email,
        contrasena,
        tipoUsuario
      );


      setIsLoadingModalOpen(false);

      if (newUserCreated) {
       
        setIsSuccessModalOpen(true);
        console.log("Usuario registrado exitosamente:", newUserCreated);
        setTimeout(() => {
          router.push("/login");
        }, 2000);

      } else {
   
        setErrorMessage("Ocurrió un error al intentar crear la cuenta.");
        setIsErrorModalOpen(true);
      }
    } catch (error) {
   
      setIsLoadingModalOpen(false);
      setErrorMessage("Error al realizar la solicitud. Intenta nuevamente.");
      setIsErrorModalOpen(true);
      console.error("Error al realizar la solicitud:", error);
    }
  };

  return (
    <main className="relative flex-grow">
      <section className="relative min-h-screen flex items-center justify-center py-10">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/buildings.jpg"
            alt="Hero"
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>

        {/* Contenedor del formulario */}
        <div className="bg-secondaryOri border-2 border-greyOri p-6 rounded-lg shadow-lg w-[550px] max-w-full">
          <header className="flex flex-col justify-between items-center mb-4">
            <h1 className="text-xl font-bold mb-2">Crear una cuenta</h1>
            <p className="text-sm text-greyOri-400 mb-2">
              Elige tu tipo de cuenta e ingresa tu información.
            </p>
          </header>

          {/* Formulario */}
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            {/* Selector de roles */}
            <div className="flex justify-center items-center bg-greyOri-50 p-2 mb-8 rounded-xl gap-4">
              {/* Opción Estudiante */}
              <div
                className={`flex gap-2 items-center justify-center flex-grow ${
                  !isProfesor
                    ? "bg-primaryOri text-secondaryOri"
                    : "text-primaryOri"
                } font-bold rounded-lg py-4 px-8 cursor-pointer`}
                onClick={() => setSelectedRole("estudiante")}
              >
                <FontAwesomeIcon
                  icon={faUserGraduate}
                  className={`w-4 h-4 ${
                    !isProfesor ? "text-secondaryOri" : "text-primaryOri"
                  }`}
                />
                <h1
                  className={`text-sm-ori ${
                    !isProfesor ? "text-secondaryOri" : "text-primaryOri"
                  }`}
                >
                  Estudiante
                </h1>
              </div>

              {/* Opción Profesor */}
              <div
                className={`flex gap-2 items-center justify-center flex-grow ${
                  isProfesor
                    ? "bg-primaryOri text-secondaryOri"
                    : "text-primaryOri"
                } font-bold rounded-lg py-4 px-8 cursor-pointer`}
                onClick={() => setSelectedRole("profesor")}
              >
                <FontAwesomeIcon
                  icon={faUserTie}
                  className={`w-4 h-4 ${
                    isProfesor ? "text-secondaryOri" : "text-primaryOri"
                  }`}
                />
                <h1
                  className={`text-sm-ori ${
                    isProfesor ? "text-secondaryOri" : "text-primaryOri"
                  }`}
                >
                  Profesor
                </h1>
              </div>
            </div>

            {/* Campos del formulario */}
            <TextField
              text="Nombre completo"
              placeHolder="Tu nombre"
              isWithIcon={false}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <TextField
              text="Correo electrónico"
              placeHolder="micorreo@gmail.com"
              isWithIcon={false}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextFieldForPassword
              text="Contraseña"
              placeHolder="Tu contraseña"
              isWithIcon={true}
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
            <TextFieldForPassword
              text="Confirmar contraseña"
              placeHolder="Confirma tu contraseña"
              isWithIcon={true}
              value={confirmarContrasena}
              onChange={(e) => setConfirmarContrasena(e.target.value)}
            />
            <div className="flex flex-col gap-4 justify-center items-center">
              {/* Botón de envío */}
              <FillButton
                text={`Crear cuenta de ${
                  isProfesor ? "profesor" : "estudiante"
                }`}
                isWithIcon={false}
                paddingX="px-10"
                isFullWidth={true}
              />
            </div>
          </form>

          {/* Enlace a iniciar sesión */}
          <footer className="flex items-center justify-center gap-2 text-sm-ori text-greyOri-500 mt-6">
            ¿Ya tienes una cuenta?
            <Link href="/login" className="text-primaryOri">
              Inicia sesión
            </Link>
          </footer>

          {/* Modales */}
          {isLoadingModalOpen && (
            <LoadingModal
              isOpen={isLoadingModalOpen}
              description="Creando cuenta..."
              onClose={() => setIsLoadingModalOpen(false)}
            />
          )}
          {isSuccessModalOpen && (
            <SuccesModal
              isOpen={isSuccessModalOpen}
              description="Cuenta creada exitosamente."
              onClose={() => setIsSuccessModalOpen(false)}
            />
          )}
          {isErrorModalOpen && (
            <ErrorModal
              isOpen={isErrorModalOpen}
              description={errorMessage || "Error desconocido"}
              onClose={() => setIsErrorModalOpen(false)}
            />
          )}
        </div>
      </section>
    </main>
  );
}