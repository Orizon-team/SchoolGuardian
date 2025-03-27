"use client";

import React, { useState, useEffect } from "react";
import { SearchField } from "@/components/ui/search_Field";
import { Table } from "@/components/ui/table";
import { StatusIndicator } from "@/components/ui/status";
import { StatusCheckbox } from "@/components/ui/status_Checkbox";
import { FillButton, OutlineButton } from "@/components/ui/button";
import { GetNowDate } from "@/lib/utils";
import { getStudentsRequest } from "@/lib/api/fetch/students_request";
import { Alumno } from "@/lib/api/models/definitions";

interface ModalAssitanceProps {
  onClose: () => void;
  subjectName: string;
  id_clase: number;
}

export function ModalAssitance({
  onClose,
  subjectName,
  id_clase,
}: ModalAssitanceProps) {
  const [students, setStudents] = useState<Alumno[]>([]);
  const [loading, setLoading] = useState(true);
  const [checks, setChecks] = useState<{
    [key: number]: { onTime: boolean; late: boolean; missing: boolean };
  }>({});

  // Estado para los contadores globales
  const [counters, setCounters] = useState({
    onTime: 0,
    late: 0,
    missing: 0,
  });

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      const data = await getStudentsRequest(id_clase.toString());
      if (data) {
        setStudents(data); // Aquí usamos `data` directamente porque ya es un arreglo de alumnos

        // Inicializar los checks para cada alumno
        const initialChecks = data.reduce((acc: any, student: Alumno) => {
          acc[student.id_usuario] = {
            onTime: false,
            late: false,
            missing: false,
          };
          return acc;
        }, {});
        setChecks(initialChecks);
      } else {
        console.error("No se pudieron obtener los alumnos.");
      }
      setLoading(false);
    };

    fetchStudents();
  }, [id_clase]);

  useEffect(() => {
    const newCounters = {
      onTime: 0,
      late: 0,
      missing: 0,
    };

    // Contar cada estado
    Object.values(checks).forEach((student) => {
      if (student.onTime) newCounters.onTime++;
      if (student.late) newCounters.late++;
      if (student.missing) newCounters.missing++;
    });

    setCounters(newCounters);
  }, [checks]);

  const handleChange =
    (id_usuario: number, type: "onTime" | "late" | "missing") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setChecks((prev) => ({
        ...prev,
        [id_usuario]: {
          onTime: type === "onTime" ? e.target.checked : false,
          late: type === "late" ? e.target.checked : false,
          missing: type === "missing" ? e.target.checked : false,
        },
      }));
    };

  const headers = ["Nombre", "Correo Electrónico", "Asistencia"];
  const rows = students.map((student) => [
    student.nombre,
    student.email || "No disponible",
    <div className="flex justify-center gap-4" key={student.id_usuario}>
      <StatusCheckbox
        label="A tiempo"
        color="green"
        checked={checks[student.id_usuario]?.onTime || false}
        onChange={handleChange(student.id_usuario, "onTime")}
      />
      <StatusCheckbox
        label="Tarde"
        color="yellow"
        checked={checks[student.id_usuario]?.late || false}
        onChange={handleChange(student.id_usuario, "late")}
      />
      <StatusCheckbox
        label="Falta"
        color="red"
        checked={checks[student.id_usuario]?.missing || false}
        onChange={handleChange(student.id_usuario, "missing")}
      />
    </div>,
  ]);

  const headClassName = ["", "", "text-center"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[99vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex gap-6">
            <div className="flex-1 rounded-md p-8 border border-greyOri-200 space-y-4">
              <div className="space-y-1">
                <h2 className="text-3xl-ori font-bold text-primaryOri">
                  Asistencia estudiantil - {subjectName}
                </h2>
                <p className="text-base-ori text-greyOri-500">
                  Marcar asistencia para {GetNowDate()}.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <SearchField placeHolder="Buscar alumnos" />
                <StatusIndicator
                  text={`A tiempo: ${counters.onTime}`}
                  bgColor="bg-greenOri-100"
                  textColor="text-successstate"
                />
                <StatusIndicator
                  text={`Tarde: ${counters.late}`}
                  bgColor="bg-yellowOri-100"
                  textColor="text-warningstate"
                  showWidth={true}
                />
                <StatusIndicator
                  text={`Ausente: ${counters.missing}`}
                  bgColor="bg-redOri-100"
                  textColor="text-errostate"
                />
              </div>

              <div className="overflow-y-auto max-h-[400px] border-t border-greyOri-200 mt-4">
                {loading ? (
                  <p className="text-center">Cargando alumnos...</p>
                ) : (
                  <Table
                    headers={headers}
                    rows={rows}
                    headClassName={headClassName}
                  />
                )}
              </div>
              <div className="flex justify-between">
                <OutlineButton
                  text="Cancelar"
                  paddingX="px-10"
                  paddingY="py-3"
                  isWithIcon={false}
                  onClick={onClose}
                />
                <FillButton
                  text="Guardar"
                  paddingX="px-10"
                  paddingY="py-3"
                  isWithIcon={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
