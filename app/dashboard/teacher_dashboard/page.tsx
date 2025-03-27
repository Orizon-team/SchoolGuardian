"use client";
import { useState, useEffect } from "react";
import { SearchField } from "@/components/ui/search_Field";
import { ClassCardTeacher } from "@/components/ui/class_card";
import { FillButton } from "@/components/ui/button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProfileCardModal } from "@/components/modals/profile_teacher_modal";
import { CreateClassModal } from "@/components/modals/create_class_modal";
import { WarningModal } from "@/components/modals/status_modal";
import { ModalAssitance } from "@/components/ui/modal_Assistance";
import { GetNowDate } from "@/lib/utils";
import { classTeacherRequest } from "@/lib/api/fetch/class_teacher_request";
import { Clase } from "@/lib/api/models/definitions";

export default function TeacherDashboard() {
  const [isCreateClassModalOpen, setIsCreateClassModalOpen] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [isAssistanceModalOpen, setIsAssistanceModalOpen] = useState(false);
  const [classes, setClasses] = useState<Clase[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    const idProfesor = usuario?.id || null;

    if (!idProfesor) {
      console.error("No se encontró un ID de profesor válido.");
      setClasses([]);
      setLoading(false);
      return;
    }
    console.log("ID del profesor:", idProfesor);
      const result = await classTeacherRequest(idProfesor);

      if (typeof result === "string") {
        console.error("Error al obtener las clases:", result);
        setClasses([]);
      } else {
        console.log("Clases obtenidas:", result);
        setClasses(result);
      }
      setLoading(false);
    };

    fetchClasses();
  }, []);

  const handleOpenModal = () => setIsCreateClassModalOpen(true);
  const handleCloseModal = () => setIsCreateClassModalOpen(false);

  const handleOpenWarningModal = () => setIsWarningModalOpen(true);
  const handleCloseWarningModal = () => setIsWarningModalOpen(false);

  const handleOpenAssistenceModal = () => setIsAssistanceModalOpen(true);
  const handleCloseAssistenceModal = () => setIsAssistanceModalOpen(false);

  return (
    <section className="flex flex-col gap-y-4 px-40 py-10">
      <h1 className="text-primaryOri text-3xl-ori font-bold">Dashboard</h1>
      <p className="text-greyOri-400">{GetNowDate()}</p>
      <div className="flex gap-4 justify-between">
        <div className="w-1/3">
          <SearchField placeHolder="Buscar clase" />
        </div>
        <FillButton
          text="Clase nueva"
          isFlex={true}
          isFullWidth={true}
          paddingX="px-20"
          isWithIcon={true}
          onClick={handleOpenModal}
          icon={<FontAwesomeIcon icon={faPlus} />}
        />
      </div>

      {/* Modales */}
      <ProfileCardModal
        isOpen={isCreateClassModalOpen}
        onClose={handleCloseModal}
        name="Juan Pérez"
        email="juan.perez@example.com"
        role={1}
        width="w-96"
      />

      <CreateClassModal
        isOpen={isCreateClassModalOpen}
        onClose={handleCloseModal}
      />

      <WarningModal
        isOpen={isWarningModalOpen}
        onClose={handleCloseWarningModal}
        description="¿Deseas eliminar tu clase? Los cambios no serán reversibles"
      />

      {isAssistanceModalOpen && (
        <ModalAssitance onClose={() => setIsAssistanceModalOpen(false)} />
      )}

      {/* Contenido principal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-6 gap-8">
        {loading ? (
          <p className="text-center col-span-full">Cargando clases...</p>
        ) : classes && classes.length > 0 ? (
          classes.map((clase) => (
            <ClassCardTeacher
              key={clase.id_clase}
              nameClass={clase.nombre_clase}
              description={clase.descripcion}
              duration={clase.duracion}
              schedule={clase.horario}
              numberOfStudents={clase.cantidadAlumnos}
              days={clase.dias.join(", ")}
              codeClass={clase.codigo_clase}
              teacherName=""
              onDeleteClick={handleOpenWarningModal}
              onAttendanceClick={handleOpenAssistenceModal}
            />
          ))
        ) : (
          <p className="text-center col-span-full">Aún no has creado clases</p>
        )}
      </div>
    </section>
  );
}