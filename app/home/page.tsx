"use client";
import { useState } from "react";
import { ClassCardTeacher, ClassCardStudent } from "@/components/ui/class_card";
import { CreateClassModal } from "@/components/modals/create_class_modal";
import { FeatureCard } from "@/components/ui/feature_card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup, faBook } from "@fortawesome/free-solid-svg-icons";
import { FillButton, OutlineButton } from "@/components/ui/button";
import { SuccesModal, ErrorModal, WarningModal, LoadingModal } from "@/components/modals/status_modal";
import {BreadCumb} from "@/components/ui/bradcumbs";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccesModalOpen, setIsSuccesModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-center w-full">
      {/* usar bradcumbs */}
      <BreadCumb/>
      <ClassCardStudent
        nameClass="Matemáticas"
        description="Clase avanzada de mates"
        duration={10}
        schedule="9:10"
        days="Lunes y Miércoles"
        numberOfStudents={10}
        codeClass="29298yh"
        teacherName="Rodrigo"
      />
      <ClassCardTeacher
        nameClass="Matemáticas"
        description="Clase avanzada de mates"
        duration={10}
        schedule="9:10"
        days="Lunes y Miércoles"
        numberOfStudents={10}
        codeClass="29298yh"
        teacherName="Rodrigo"
      />

      <FeatureCard
        icon={<FontAwesomeIcon icon={faUserGroup} />}
        title="Administra clases"
        description="Captura las asistencias con un solo click. Centra las llegadas en tiempos automaticos"
      />

      <FillButton
        text="Crear clase"
        isWithIcon={false}
        paddingX="px-10"
        onClick={() => setIsModalOpen(true)}
      />

      <FillButton
        text="Modal de éxito"
        isWithIcon={false}
        paddingX="px-10"
        onClick={() => setIsSuccesModalOpen(true)}
      />

      <FillButton
        text="Modal de error"
        isWithIcon={false}
        paddingX="px-10"
        onClick={() => setIsErrorModalOpen(true)}
      />

      <FillButton
        text="Modal de advertencia"
        isWithIcon={false}
        paddingX="px-10"
        onClick={() => setIsWarningModalOpen(true)}
      />

      <FillButton
        text="Modal de carga"
        isWithIcon={false}
        paddingX="px-10"
        onClick={() => setIsLoadingModalOpen(true)}
      />
      {/* Modal para crear clase */}
      <CreateClassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <SuccesModal
        isOpen={isSuccesModalOpen}
        description="La clase se ha creado correctamente"
        onClose={() => setIsSuccesModalOpen(false)}
      />

      <ErrorModal
        isOpen={isErrorModalOpen}
        description="Ha ocurrido un error al crear la clase"
        onClose={() => setIsErrorModalOpen(false)}
      />

      <WarningModal
        isOpen={isWarningModalOpen}
        description="¿Estás seguro de eliminar"
        onClose={() => setIsWarningModalOpen(false)}
      />

      <LoadingModal
        isOpen={isLoadingModalOpen}
        description="Cargando..."
      />

    </div>
  );
}
