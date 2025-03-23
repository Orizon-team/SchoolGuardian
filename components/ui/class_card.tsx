"use client"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faClock,
  faCalendarDays,
  faCopy,
  
} from "@fortawesome/free-regular-svg-icons";
import { faCheck,faUserGroup, faBook } from "@fortawesome/free-solid-svg-icons";
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
}: classCardProps) {
  const [isCopy, setIsCopy] = useState(false)
  const [showAttendanceModal, setShowAttendanceModal] = useState(false)

  const handleAttendanceClick = () => {
    setShowAttendanceModal(true)
  }

  // Función para cerrar el modal de asistencias
  const handleCloseAttendanceModal = () => {
    setShowAttendanceModal(false)
  }
  
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
          <FontAwesomeIcon icon={faUserGroup} className="text-primaryOri w-4 h-5" />
          <label className="textsm text-primaryOri">{numberOfStudents}</label>
        </div>
        <div className="flex gap-4 items-center items-center justify-between">
          <div className="flex bg-greyOri-50 p-1 px-2 rounded-xl gap-2 ">
            <label className="text-greyOri-500 font-bold">Code: {codeClass}</label>
          </div>
          <span
            onClick={() => setIsCopy(!isCopy)} // Alterna la visibilidad
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
      <div className="flex justify-between gap-24">
        <SpecialGreenButton
          text="Asistencias"
          isWithIcon={true}
          icon={<CheckIcon />}
        />
        <SpecialRedButton
          text="Eliminar"
          isWithIcon={true}
          icon={<TrashIcon />}
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
          text="Eliminar"
          isWithIcon={true}
          icon={<TrashIcon />}
       
        />
      </div>
    </section>
  );
}