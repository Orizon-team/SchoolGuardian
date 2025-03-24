"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import { TextField, TextFieldForPassword } from "@/components/ui/text_field";
import { FillButton } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function SignUp() {
  const [selectedRole, setSelectedRole] = useState("profesor"); // Estado para controlar la selección
  const isProfesor = selectedRole === "profesor";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario
    console.log("Formulario enviado");
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            />
            <TextField
              text="Correo electrónico"
              placeHolder="micorreo@gmail.com"
              isWithIcon={false}
            />
            <TextFieldForPassword
              text="Contraseña"
              placeHolder=""
              isWithIcon={true}
            />
            <TextFieldForPassword
              text="Confirmar contraseña"
              placeHolder=""
              isWithIcon={true}
            />
            <div className="flex flex-col gap-4 justify-center items-center">
              {/* Información dinámica */}
              <div className="flex flex-col bg-greyOri-50 p-4 rounded-xl gap-2">
                <div className="flex gap-4 items-center">
                  <FontAwesomeIcon
                    icon={isProfesor ? faUserTie : faUserGraduate}
                    className="text-primaryOri w-4 h-5"
                  />
                  <h1 className="text-primaryOri ">
                    {isProfesor ? "Profesor" : "Estudiante"}
                  </h1>
                </div>
                <p className="text-greyOri-400">
                  {isProfesor
                    ? "Como profesor, podrás crear clases, administrar la asistencia de los estudiantes."
                    : "Como estudiante, podrás unirte a clases, ver tu historial de asistencia y más."}
                </p>
              </div>

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
        </div>
      </section>
    </main>
  );
}
