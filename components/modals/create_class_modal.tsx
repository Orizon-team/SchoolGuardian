import { TextField } from "@/components/ui/text_field";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { ClockIcon } from "@heroicons/react/24/outline";
import { Checkbox } from "@/components/ui/checkbox";
import { FillButton, OutlineButton } from "@/components/ui/button";

interface CreateClassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateClassModal({ isOpen, onClose }: CreateClassModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
      <section className="bg-secondaryOri border-2 border-greyOri p-5 rounded-lg shadow-lg w-[500px] max-w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Crear Clase</h1>
          <button
            onClick={onClose}
            className="text-greyOri-500 hover:text-greyOri-700"
          >
            ✕ {/* Botón para cerrar el modal */}
          </button>
        </div>
        <p className="text-sm text-greyOri-400 mb-4">
          Llena los campos para crear una nueva clase.
        </p>
        <div className="flex flex-col gap-4">
          <TextField
            text="Nombre de la clase"
            placeHolder="Nombre de tu clase"
            isWithIcon={false}
            isBold={true}
          />
          <TextField
            text="Descripción"
            placeHolder="Describe una breve introducción de tu clase"
            isWithIcon={false}
            isBold={true}
          />
          <div className="flex gap-4 items-center">
            <TextField
              text="Hora de entrada"
              placeHolder="9:00"
              isWithIcon={true}
              icon={<ClockIcon />}
              isBold={true}
            />
            <TextField
              text="Duración (Horas)"
              placeHolder="200"
              isWithIcon={true}
              icon={<ClockIcon />}
              isBold={true}
            />
          </div>
          <label className="text-primaryOri font-bold text-sm">
            Días de la semana
          </label>
          <div className="grid grid-cols-4 gap-2">
            <Checkbox label="Lunes" />
            <Checkbox label="Martes" />
            <Checkbox label="Miércoles" />
            <Checkbox label="Jueves" />
            <Checkbox label="Viernes" />
            <Checkbox label="Sábado" />
            <Checkbox label="Domingo" />
          </div>
          <div className="flex flex-col bg-greyOri-50 p-4 rounded-xl gap-2">
            <div className="flex gap-4 items-center">
              <FontAwesomeIcon
                icon={faUserTie}
                className="text-primaryOri w-4 h-5"
              />
              <h1 className="text-primaryOri ">Profesor</h1>
            </div>
            <p className="text-greyOri-400">
              Como profesor, podrás crear clases, administrar la asistencia de
              los estudiantes.
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center gap-8 mt-6">
          <OutlineButton
            text="Cancelar"
            isWithIcon={false}
            paddingX="px-10"
            onClick={onClose}
          />
          <FillButton text="Crear" isWithIcon={false} paddingX="px-10" />
        </div>
      </section>
    </div>
  );
}
