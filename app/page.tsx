"use client";
import React, { useState } from "react";
import {
  FillButton,
  OutlineButton_white,
  SpecialRedButton,
  SpecialGreenButton,
} from "@/components/ui/button";
import { TextField, TextFieldForPassword } from "@/components/ui/text_field";
import { Checkbox } from "@/components/ui/checkbox";
import { SearchField } from "@/components/ui/search_Field";
import { AttendanceModal } from "@/components/ui/attendance_modal";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  EyeDropperIcon,
  EyeIcon,
  HomeIcon,
  TrashIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Dropdown } from "@/components/ui/dropdown";
import Link from "next/link";
import { CloseEvent } from "node:http";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Table } from "@/components/ui/table";
import { StatusIndicator } from "@/components/ui/status";
import { ClassCardTeacher } from "@/components/ui/class_card";
import { StatusCheckbox  } from "@/components/ui/status_Checkbox";

export default function Page() {
  const genres = ["Option 1", "Option 2", "Option 3", "Option 4"];
  const [checks, setChecks] = useState({
    onTime1: false,
    onTime2: false,
    late1: false,
    late2: false,
    missing1: false,
    missing2: false,
  });

  const headers = ["Nombre", "Edad", "Cargo", "Fecha de ingreso"];
  const rows = [
    ["Juan Pérez", "28", "Desarrollador", "2021-05-15"],
    ["María Gómez", "34", "Diseñadora", "2019-08-20"],
    ["Carlos López", "42", "Gerente", "2018-03-10"],
  ];

  const headClassName = [];
  const tbodyClassName = [];

  const handleChange = (key: keyof typeof checks) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecks({ ...checks, [key]: e.target.checked });
  };


  return (
    <main className="flex min-h-screen flex-col">
      {/* Componentes de botones */}
      <div className="flex flex-column gap-x-4">
        <h1 className="text-2xl font-bold text-white">Buttons components</h1>

        <FillButton text="Hello!" isWithIcon={true} icon={<UserIcon />} />
        <OutlineButton_white
          text="Empezar"
          isWithIcon={false}
          icon={<HomeIcon />}
        />
        <SpecialRedButton
          text="Eliminar"
          isWithIcon={true}
          icon={<TrashIcon />}
        />
        <SpecialGreenButton
          text="Editar"
          isWithIcon={true}
          icon={<CheckCircleIcon />}
        />
      </div>

      {/* Componentes de selectores */}
      <Dropdown placeholder="Dropdown" genres={genres} />

      {/* Componentes de entrada de texto */}
      <div className="flex flex-column gap-x-2">
        <TextField
          text="Nombre"
          placeHolder="Tu nombre"
          isWithIcon={false}
          icon={<UserIcon />}
        />
        <TextFieldForPassword
          text="Contraseña"
          placeHolder="Tu contraseña"
          isWithIcon={true}
        />
      </div>

      {/* componente checkbox */}
      <div className="p-4">
        <Checkbox label="Lunes" />
      </div>

      {/* Componente de Tabla */}
      <div className="p-2">
        <Table headers={headers} rows={rows} headClassName={headClassName} tbodyClassName={tbodyClassName} />
      </div>
      <div>
        {/* Componentes de Estado */}
          <StatusIndicator
            text="A tiempo"
            bgColor="bg-greenOri-100"
            textColor="text-successstate"
          />

          {/* Estado "Tarde" */}
          <StatusIndicator
            text="Tarde"
            bgColor="bg-yellowOri-100"
            textColor="text-warningstate"
          />

          {/* Estado "Ausente" */}
          <StatusIndicator
            text="Ausente"
            bgColor="bg-redOri-100"
            textColor="text-errostate"
          />
      </div>
      <div className="p-4 flex flex-col gap-2 w-fit">
      <StatusCheckbox
        label="A tiempo"
        color="green"
        checked={checks.onTime1}
        onChange={handleChange("onTime1")}
      />
      <StatusCheckbox
        label="A tiempo"
        color="green"
        checked={checks.onTime2}
        onChange={handleChange("onTime2")}
      />
      <StatusCheckbox
        label="Tarde"
        color="yellow"
        checked={checks.late1}
        onChange={handleChange("late1")}
      />
      <StatusCheckbox
        label="Tarde"
        color="yellow"
        checked={checks.late2}
        onChange={handleChange("late2")}
      />
      <StatusCheckbox
        label="Falta"
        color="red"
        checked={checks.missing1}
        onChange={handleChange("missing1")}
      />
      <StatusCheckbox
        label="Falta"
        color="red"
        checked={checks.missing2}
        onChange={handleChange("missing2")}
      />
    </div>
      <div>
        <SearchField placeHolder="Buscar clases" />
      </div>
      {/* Conponente del footer */}
      <div>
        <Footer />
      </div>
    </main>
  );
}
