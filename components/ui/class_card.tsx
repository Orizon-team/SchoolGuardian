"use client"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faClock,
  faCalendarDays,
  faCopy,
  
} from "@fortawesome/free-regular-svg-icons";
import { faCheck,faUserGroup, faBook, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import {
  FillButton,
  SpecialGreenButton,
  SpecialRedButton,
} from "@/components/ui/button";
import { TrashIcon, CheckIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

interface classCardProps {
  nameClass: string;
  description: string;
  duration: number;
  schedule: string;
  days: string;
  numberOfStudents: number;
  codeClass: string;
  teacherName: string;
  onAttendanceClick?: () => void; // Función para el botón "Asistencias"
  onDeleteClick?: () => void; // Función para el botón "Eliminar"
}


export function ClassCardTeacher({
  nameClass,
  description,
  duration,
  schedule,
  numberOfStudents,
  days,
  codeClass,
  teacherName,
  onAttendanceClick,
  onDeleteClick,
}: classCardProps) {
  const [isCopy, setIsCopy] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeClass); // Copia el código al portapapeles
    setIsCopy(true); // Cambia el estado para mostrar el ícono de check
    setTimeout(() => setIsCopy(false), 2000); // Vuelve al ícono de copiar después de 2 segundos
  };

  return (
    <section className="bg-secondaryOri border-2 border-greyOri p-5 rounded-lg shadow-lg w-auto">
      <h1 className="text-xl font-bold">{nameClass}</h1>
      <p className="text-sm text-greyOri-400">{description}</p>
      <div className="flex justify-between flex-col gap-2 pt-4 pb-4">
        <div className="flex gap-4 items-center">
          <FontAwesomeIcon icon={faClock} className="text-primaryOri w-4 h-5" />
          <label className="textsm text-primaryOri">
            {schedule} - Duración: {duration}
          </label>
        </div>
        <div className="flex gap-4 items-center">
          <FontAwesomeIcon
            icon={faCalendarDays}
            className="text-primaryOri w-4 h-5"
          />
          <label className="textsm text-primaryOri">{days}</label>
        </div>
        <div className="flex gap-4 items-center">
          <FontAwesomeIcon
            icon={faUserGroup}
            className="text-primaryOri w-4 h-5"
          />
          <label className="textsm text-primaryOri">{numberOfStudents}</label>
        </div>
        <div className="flex gap-4 items-center justify-between">
          <div className="flex bg-greyOri-50 p-1 px-2 rounded-xl gap-2">
            <label className="text-greyOri-500 font-bold">Code: {codeClass}</label>
          </div>
          <span
            onClick={handleCopy} // Llama a la función para copiar
            className="cursor-pointer"
          >
            {isCopy ? (
              <FontAwesomeIcon
                icon={faCheck}
                className="text-primaryOri w-4 h-5 cursor-pointer"
              />
            ) : (
              <FontAwesomeIcon
                icon={faCopy}
                className="text-primaryOri w-4 h-5 cursor-pointer"
              />
            )}
          </span>
        </div>
      </div>
      <div className="flex justify-between flex-wrap gap-4">
        <SpecialGreenButton
          text="Asistencias"
          isWithIcon={true}
          icon={<CheckIcon />}
          onClick={onAttendanceClick} // Llama a la función pasada como prop
        />
        <SpecialRedButton
          text="Eliminar"
          isWithIcon={true}
          icon={<TrashIcon />}
          onClick={onDeleteClick} // Llama a la función pasada como prop
        />
      </div>
    </section>
  );
}

export function ClassCardStudent({
  nameClass,
  description,
  duration,
  schedule,
  numberOfStudents,
  days,
  codeClass,
  teacherName,
}: classCardProps) {
  return (
    <section className="bg-secondaryOri border-2 border-greyOri p-5 rounded-lg shadow-lg ">
      <h1 className="text-xl font-bold">{nameClass}</h1>
      <p className="text-sm text-greyOri-400">{description}</p>
      <div className="flex justify-between flex-col gap-2 pt-4 pb-4">
        <div className="flex gap-4 items-center">
          <FontAwesomeIcon icon={faClock} className="text-primaryOri w-4 h-5" />
          <label className="textsm text-primaryOri">
            {schedule} - Duración: {duration}
          </label>
        </div>
        <div className="flex gap-4 items-center">
          <FontAwesomeIcon
            icon={faCalendarDays}
            className="text-primaryOri w-4 h-5"
          />
          <label className="textsm text-primaryOri">{days}</label>
        </div>
        <div className="flex gap-4 items-center">
          <FontAwesomeIcon icon={faUserGroup} className="text-primaryOri w-4 h-5" />
          <label className="textsm text-primaryOri">{numberOfStudents}</label>
        </div>
        <div className="flex gap-4 items-center">
          <FontAwesomeIcon icon={faBook} className="text-primaryOri w-4 h-5" />
          <label className="textsm text-primaryOri">{teacherName}</label>
        </div>
       
      </div>
      <div className="flex justify-end items-center gap-24 pl-28">
     
        <SpecialRedButton
          text="Dejar clase"
          isWithIcon={true}
          icon={<FontAwesomeIcon icon={faArrowRightFromBracket} className="w-4 h-4" />}
        />
      </div>
    </section>
  );
}