"use client";

import React, { useState, useEffect } from "react";
import { SearchField } from "@/components/ui/search_Field";
import { FillButton } from "@/components/ui/button";
import { JoinClass } from "@/components/ui/join_Class";
import { ClassCardStudent } from "@/components/ui/class_card";
import { GetNowDate } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { classStudentRequest } from "@/lib/api/fetch/clase_student_request";

export default function My_Classes() {
  const [isJoinClassOpen, setIsJoinClassOpen] = useState(false);
  const [classes, setClasses] = useState<any[]>([]); // Almacena las clases del estudiante
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Manejo de errores
  const [searchTerm, setSearchTerm] = useState(""); // Término de búsqueda

  useEffect(() => {
    /**
     * Carga las clases del estudiante al montar el componente
     * Maneja estados de carga y errores
     */
    const loadClasses = async () => {
      try {
        const data = await classStudentRequest();
        if (data) {
          setClasses(Array.isArray(data) ? data : []); // Asegura que siempre sea array
        } else {
          throw new Error("No se pudieron cargar las clases");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    loadClasses();
  }, []);

  // **************************
  // *** FUNCIONES UTILITARIAS
  // **************************
  /**
   * Formatea un string de fecha-hora a formato legible
   * Ejemplo: "2025-03-20 10:00:00" -> "10:00 AM"
   */
  const formatTime = (datetimeString: string) => {
    try {
      const date = new Date(datetimeString);
      return date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).replace(/\./g, '');
    } catch {
      return "Horario no definido"; // Fallback seguro
    }
  };

  /**
   * Filtra las clases basado en el término de búsqueda
   * Maneja casos donde los datos podrían estar incompletos
   */
  const filteredClasses = classes.filter(clase => {
    if (!clase || !clase.nombre_clase) return false;
    try {
      return clase.nombre_clase.toString().toLowerCase()
        .includes(searchTerm.toLowerCase());
    } catch {
      return false; // Ignora elementos con errores
    }
  });

  const handleOpenModalCodeClass = () => setIsJoinClassOpen(true);
  const handleCloseModalCodeClass = () => setIsJoinClassOpen(false);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // **************************
  // *** RENDERIZADO CONDICIONAL
  // **************************
  if (loading) return <div className="text-center py-10">Cargando clases...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;


  return (
    <div className="flex flex-col gap-y-4 px-40 py-10">
      <div className="mb-8">
        <h2 className="text-4xl-ori font-bold text-primaryOri">Mis Clases</h2>
        <p className="text-lg-ori text-greyOri-500 mb-6">{GetNowDate()}</p>

        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <SearchField
              placeHolder="Buscar clases"
              onChange={handleSearchChange}
            />
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
            {isJoinClassOpen && <JoinClass onClose={handleCloseModalCodeClass} />}
          </div>
        </div>
      </div>

      {/* Grid de clases */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-6 gap-8">
        {filteredClasses.length > 0 ? (
          filteredClasses.map((clase) => (
            <ClassCardStudent
              key={clase.id_clase}
              nameClass={clase.nombre_clase || "Sin nombre"}
              description={`Clase de ${clase.nombre_clase}`}
              duration={clase.duracion || 90}
              schedule={formatTime(clase.horario)}
              numberOfStudents={clase.cantidadAlumnos || 0}
              days={Array.isArray(clase.dias) ? clase.dias.join(", ") : "Días no definidos"}
              codeClass={""}
              teacherName={clase.nombreProfesor || "Profesor no asignado"}
              classId={clase.id_clase}
              onClassLeft={() => {
                setClasses(prev => prev.filter(c => c.id_clase !== clase.id_clase));
              }}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            {searchTerm
              ? `No se encontraron clases que coincidan con "${searchTerm}"`
              : "No tienes clases asignadas"}
          </div>
        )}
      </div>
    </div>
  );
}