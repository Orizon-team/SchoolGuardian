"use client";

import React, { useState, useEffect } from "react";
import { SearchField } from "@/components/ui/search_Field";
import { Table } from "@/components/ui/table";
import { StatusIndicator } from "@/components/ui/status";
import { StatusCheckbox } from "@/components/ui/status_Checkbox";
import { FillButton, OutlineButton } from "@/components/ui/button";

interface ModalAssitanceProps {
  onClose: () => void;
}

export function ModalAssitance({ onClose }: ModalAssitanceProps) {

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const [checks, setChecks] = useState({
    alice: { onTime: false, late: false, missing: false },
    carlos: { onTime: false, late: false, missing: false },
    sophie: { onTime: false, late: false, missing: false },
    daniel: { onTime: false, late: false, missing: false }
  });

  // Estado para los contadores globales
  const [counters, setCounters] = useState({
    onTime: 0,
    late: 0,
    missing: 0
  });

  // Actualizar contadores cuando cambian los checks
  useEffect(() => {
    const newCounters = {
      onTime: 0,
      late: 0,
      missing: 0
    };

    // Contar cada estado
    Object.values(checks).forEach(student => {
      if (student.onTime) newCounters.onTime++;
      if (student.late) newCounters.late++;
      if (student.missing) newCounters.missing++;
    });

    setCounters(newCounters);
  }, [checks]);

  const handleChange = (student: keyof typeof checks, type: 'onTime' | 'late' | 'missing') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // Solo permitir un checkbox marcado por estudiante
      setChecks(prev => ({
        ...prev,
        [student]: {
          onTime: type === 'onTime' ? e.target.checked : false,
          late: type === 'late' ? e.target.checked : false,
          missing: type === 'missing' ? e.target.checked : false
        }
      }));
    };


  const headers = ["Nombre", "Correo Electrónico", "Asistencia"];
  const rows = [
    [
      "Alice Johnson", "alice.johnson@example.com",
      <div className="flex justify-center gap-4">
        <StatusCheckbox label="A tiempo" color="green" checked={checks.alice.onTime} onChange={handleChange("alice", "onTime")}  />
        <StatusCheckbox label="Tarde" color="yellow" checked={checks.alice.late} onChange={handleChange("alice", "late")} />
        <StatusCheckbox label="Falta" color="red" checked={checks.alice.missing} onChange={handleChange("alice", "missing")} />
      </div>
    ],
    [
      "Carlos Méndez", "carlos.mendez@example.com",
      <div className="flex justify-center gap-4">
        <StatusCheckbox label="A tiempo" color="green" checked={checks.carlos.onTime} onChange={handleChange("carlos", "onTime")}  />
        <StatusCheckbox label="Tarde" color="yellow" checked={checks.carlos.late} onChange={handleChange("carlos", "late")} />
        <StatusCheckbox label="Falta" color="red" checked={checks.carlos.missing} onChange={handleChange("carlos", "missing")} />
      </div>
    ],
    [
      "Sophie Laurent", "sophie.laurent@example.com",
      <div className="flex justify-center gap-4">
        <StatusCheckbox label="A tiempo" color="green" checked={checks.sophie.onTime} onChange={handleChange("sophie", "onTime")}  />
        <StatusCheckbox label="Tarde" color="yellow" checked={checks.sophie.late} onChange={handleChange("sophie", "late")} />
        <StatusCheckbox label="Falta" color="red" checked={checks.sophie.missing} onChange={handleChange("sophie", "missing")} />
      </div>
    ],
    [
      "Daniel Wong", "daniel.wong@example.com",
      <div className="flex justify-center gap-4">
        <StatusCheckbox label="A tiempo" color="green" checked={checks.daniel.onTime} onChange={handleChange("daniel", "onTime")}  />
        <StatusCheckbox label="Tarde" color="yellow" checked={checks.daniel.late} onChange={handleChange("daniel", "late")} />
        <StatusCheckbox label="Falta" color="red" checked={checks.daniel.missing} onChange={handleChange("daniel", "missing")} />
      </div>
    ],
  ];

  const headClassName = ["", "", "text-center"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[99vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}>
        <div className="p-8">
          <div className="flex gap-6">
            <div className="flex-1 rounded-md p-8 border border-greyOri-200 space-y-4">
              <div className="space-y-1">
                <h2 className="text-3xl-ori font-bold text-primaryOri">
                  Asistencia estudiantil - Matemáticas
                </h2>
                <p className="text-base-ori text-greyOri-500">
                  Marcar asistencia para Lunes, 17 de Marzo, 2025
                </p>
              </div>

              <div className="flex items-center gap-4">
                <SearchField placeHolder="Buscar clases" />
                <StatusIndicator text={`A tiempo: ${counters.onTime}`}  bgColor="bg-greenOri-100" textColor="text-successstate" />
                <StatusIndicator text={`Tarde: ${counters.late}`}  bgColor="bg-yellowOri-100" textColor="text-warningstate" showWidth={true} />
                <StatusIndicator text={`Ausente: ${counters.missing}`}  bgColor="bg-redOri-100" textColor="text-errostate" />
              </div>

              <div>
                <Table headers={headers} rows={rows} headClassName={headClassName} />
              </div>
              <div className="flex justify-between">
                <OutlineButton text="Cancelar" paddingX="px-10" paddingY="py-3" isWithIcon={false} onClick={onClose} />
                <FillButton text="Guardar" paddingX="px-10" paddingY="py-3" isWithIcon={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}