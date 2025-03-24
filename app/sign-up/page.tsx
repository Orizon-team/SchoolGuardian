"use client";
import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import { TextField, TextFieldForPassword } from "@/components/ui/text_field";
import { FillButton } from "@/components/ui/button";
import Image from "next/image";

export default function SignUp() {
  const [selectedRole, setSelectedRole] = useState("profesor"); // Estado para controlar la selección

  const isProfesor = selectedRole === "profesor";

  return (
    <section className="relative h-screen flex items-center justify-center">
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

      <section className="bg-secondaryOri border-2 border-greyOri p-5 rounded-lg shadow-lg w-[500px] max-w-full">
        <div className="flex flex-col justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Crear una cuenta</h1>
          <p className="text-sm text-greyOri-400 mb-4">
            Elige tu tipo de cuenta e ingresa tu información.
          </p>
        </div>
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

        {/* Información dinámica basada en la selección */}
        <div className="flex flex-col gap-4">
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
        </div>
        <div className="flex flex-col justify-between items-center gap-8 mt-6">
          <FillButton
            text={`Crear cuenta de ${isProfesor ? "profesor" : "estudiante"}`}
            isWithIcon={false}
            paddingX="px-10"
          />

          <div className="flex items-center gap-2">
            <p className="text-greyOri-400">¿Ya tienes una cuenta?</p>
            <a href="/login" className="text-primaryOri">
              Inicia sesión
            </a>
          </div>
        </div>
      </section>
    </section>
  );
}