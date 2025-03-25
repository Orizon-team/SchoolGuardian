"use client";

import React, { useState } from "react";
import { SearchField } from "@/components/ui/search_Field";
import { FillButton } from "@/components/ui/button";
import { JoinClass } from "@/components/ui/join_Class";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ClassCardStudent } from "@/components/ui/class_card";

export default function My_Classes() {
  const [isJoinClassOpen, setIsJoinClassOpen] = useState(false);

  const handleOpenModalCodeClass = () => {
    setIsJoinClassOpen(true);
  };
  const handleCloseModalCodeClass = () => {
    setIsJoinClassOpen(false);
  };

  return (
    <div className="flex flex-col gap-y-4 px-40 py-10">
      <div className="mb-8">
        <h2 className="text-4xl-ori font-bold text-primaryOri mb-6">
          Mis Clases
        </h2>
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <SearchField placeHolder="Buscar clases" />
          </div>
          <div className="w-auto">
            <FillButton
              text="Entrar clase"
              isFlex={true}
              isFullWidth={false}
              paddingX="px-6"
              isWithIcon={true}
              icon={<FontAwesomeIcon icon={faPlus} />}
              onClick={handleOpenModalCodeClass}
            />
            {isJoinClassOpen && (
              <JoinClass onClose={handleCloseModalCodeClass} />
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-6 gap-8">
        <ClassCardStudent
          nameClass="Matemáticas"
          description="Introducción a conceptos matemáticos básicos"
          duration={100}
          schedule="9:00 a.m"
          numberOfStudents={28}
          days="Lunes, Miércoles, Viernes"
          codeClass=""
          teacherName="Mtro. Roger"
        />
        <ClassCardStudent
          nameClass="Historia"
          description="Narración de los sucesos del pasado"
          duration={100}
          schedule="8:00 a.m"
          numberOfStudents={27}
          days="Lunes, Viernes"
          codeClass=""
          teacherName="Mtro. Marco"
        />
        <ClassCardStudent
          nameClass="Inglés"
          description="Study of grammar, vocabulary, pronunciation, etc..."
          duration={100}
          schedule="11:00 a.m"
          numberOfStudents={29}
          days="Lunes, Jueves"
          codeClass="ING141"
          teacherName="Mtro. Carlos"
        />
        <ClassCardStudent
          nameClass="Ciencias Sociales"
          description="Estudiar el origen del comportamiento individual y colectivo"
          duration={100}
          schedule="10:00 a.m"
          numberOfStudents={30}
          days="Lunes, Martes, Viernes"
          codeClass="CIS131"
          teacherName="Mtra. Ruth"
        />
        <ClassCardStudent
          nameClass="Base de Datos"
          description="Uso de las dases de datos"
          duration={100}
          schedule="1:00 p.m"
          numberOfStudents={20}
          days="Lunes, Martes, Miércoles"
          codeClass="BDS101"
          teacherName="Mtra. Miriam"
        />
      </div>
    </div>
  );
}
