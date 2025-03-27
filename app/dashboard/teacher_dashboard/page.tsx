"use client";
import { useState, useEffect } from "react";
import { SearchField } from "@/components/ui/search_Field";
import { ClassCardTeacher } from "@/components/ui/class_card";
import { FillButton } from "@/components/ui/button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faRotate } from "@fortawesome/free-solid-svg-icons";
import { ProfileCardModal } from "@/components/modals/profile_teacher_modal";
import { CreateClassModal } from "@/components/modals/create_class_modal";
import { WarningModal, LoadingModal } from "@/components/modals/status_modal";
import { ModalAssitance } from "@/components/ui/modal_Assistance";
import { GetNowDate } from "@/lib/utils";
import {
  classTeacherRequest,
  deleteClassRequest,
} from "@/lib/api/fetch/class_teacher_request";
import { Clase } from "@/lib/api/models/definitions";

export default function TeacherDashboard() {
  const [isCreateClassModalOpen, setIsCreateClassModalOpen] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const [isAssistanceModalOpen, setIsAssistanceModalOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null); // Estado para el id_clase seleccionado
  const [selectedClassName, setSelectedClassName] = useState<string | null>(null); // Estado para el nombre_clase seleccionado
  const [classes, setClasses] = useState<Clase[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [filteredClasses, setFilteredClasses] = useState<Clase[] | null>(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredClasses(classes);
    } else {
      const filtered = classes?.filter((clase) =>
        clase.nombre_clase.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredClasses(filtered || []);
    }
  }, [searchText, classes]);

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

  const handleDeleteClass = async () => {
    if (selectedClassId === null) return;
    setIsWarningModalOpen(false);
    setIsLoadingModalOpen(true);
    const response = await deleteClassRequest(selectedClassId);
    if (response === "Clase eliminada exitosamente.") {
      console.log("Clase eliminada:", selectedClassId);
      fetchClasses();
      setIsLoadingModalOpen(false);
    } else {
      console.error("Error al eliminar la clase:", response);
    }

    setSelectedClassId(null);
    setIsWarningModalOpen(false);
  };

  const handleOpenWarningModal = (id_clase: number) => {
    setSelectedClassId(id_clase);
    setIsWarningModalOpen(true);
  };

  const handleCloseWarningModal = () => {
    setSelectedClassId(null);
    setIsWarningModalOpen(false);
  };

  const handleOpenAssistanceModal = (id_clase: number, nombre_clase: string) => {
    setSelectedClassId(id_clase);
    setSelectedClassName(nombre_clase); // Establecer el nombre de la clase
    setIsAssistanceModalOpen(true);
  };

  const handleCloseAssistanceModal = () => {
    setSelectedClassId(null);
    setSelectedClassName(null); // Limpiar el nombre de la clase
    setIsAssistanceModalOpen(false);
  };

  const handleOpenModal = () => setIsCreateClassModalOpen(true);
  const handleCloseModal = () => setIsCreateClassModalOpen(false);

  return (
    <section className="flex flex-col gap-y-4 px-40 py-10">
      <h1 className="text-primaryOri text-3xl-ori font-bold">Dashboard</h1>
      <p className="text-greyOri-400">{GetNowDate()}</p>
      <div className="flex gap-4 justify-between">
        <div className="w-1/3">
          <SearchField
            placeHolder="Buscar clase"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
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
      <CreateClassModal
        isOpen={isCreateClassModalOpen}
        onClose={handleCloseModal}
        onClassCreated={fetchClasses} // Pasar fetchClasses como prop
      />

      <WarningModal
        isOpen={isWarningModalOpen}
        onClose={handleCloseWarningModal}
        description="¿Deseas eliminar tu clase? Los cambios no serán reversibles"
        onAccept={handleDeleteClass} // Confirmar eliminación
      />

      <LoadingModal
        isOpen={isLoadingModalOpen}
        description="Eliminando clase..."
        onClose={() => setIsLoadingModalOpen(false)}
      />

      {isAssistanceModalOpen && (
        <ModalAssitance
          onClose={handleCloseAssistanceModal}
          subjectName={selectedClassName || "Clase"}
          id_clase={selectedClassId || 0}
        />
      )}

      {/* Contenido principal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-6 gap-8">
        {loading ? (
          <p className="text-center col-span-full">
            <FontAwesomeIcon icon={faSpinner} spin className="text-primaryOri w-4 h-4 animate-spin" />
          </p>
        ) : filteredClasses && filteredClasses.length > 0 ? (
          filteredClasses.map((clase) => (
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
              onDeleteClick={() => handleOpenWarningModal(clase.id_clase)} // Abrir el modal con el id_clase
              onAttendanceClick={() => handleOpenAssistanceModal(clase.id_clase, clase.nombre_clase)} // Pasar id_clase y nombre_clase
            />
          ))
        ) : (
          <p className="text-center col-span-full">No se encontraron clases</p>
        )}
      </div>
    </section>
  );
}