import { FillButton, OutlineButton_white, SpecialRedButton, SpecialGreenButton, } from "@/components/ui/button";
import { TextField, TextFieldForPassword }from "@/components/ui/text_field";
import { Checkbox} from "@/components/ui/checkbox";
import { ArrowRightIcon, CheckCircleIcon, EyeDropperIcon, EyeIcon, HomeIcon, TrashIcon, UserIcon, } from "@heroicons/react/24/outline";
import{ Dropdown } from "@/components/ui/dropdown"
import Link from "next/link";
import { CloseEvent } from "node:http";
import { Header } from "@/components/ui/header";

export default function Page() {
  
  const genres = ["Option 1", "Option 2", "Option 3", "Option 4"];

  return (
    <main className="flex min-h-screen flex-col p-6">
      
      {/* Componentes de header */}
      <Header/>

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
      <Dropdown
        placeholder="Dropdown"
        genres={genres}
      />


      {/* Componentes de entrada de texto */}
      <div className="flex flex-column gap-x-2">
        <TextField text="Nombre" placeHolder="Tu nombre" isWithIcon={false} icon={ <UserIcon/>}/>
        <TextFieldForPassword text="Contraseña" placeHolder="Tu contraseña" isWithIcon={true} />
      </div>
      <div className="p-4">
      <Checkbox label="Lunes" />

      </div>
    </main>
  );
}
