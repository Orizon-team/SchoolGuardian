import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, TimeField } from "@/components/ui/text_field";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { ClockIcon } from "@heroicons/react/24/outline";
import { Checkbox } from "@/components/ui/checkbox";
import { FillButton, OutlineButton } from "@/components/ui/button";
import { createClassRequest } from "@/lib/api/fetch/class_teacher_request";
import { WarningModal, SuccesModal } from "./status_modal";

interface CreateClassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateClassModal({ isOpen, onClose }: CreateClassModalProps) {

  const router = useRouter(); 
  const [nombreClase, setNombreClase] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [hora, setHora] = useState(""); // Campo para la hora
  const [duracion, setDuracion] = useState<number | "">("");
  const [diasSeleccionados, setDiasSeleccionados] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [isSuccesModalOpen, setIsSuccesModalOpen] = useState(false); // Estado para el SuccesModal
  const [warningMessage, setWarningMessage] = useState("");

  const handleOpenWarningModal = (message: string) => {
    setWarningMessage(message);
    setIsWarningModalOpen(true);
  };

  const handleCloseWarningModal = () => {
    setIsWarningModalOpen(false);
    setWarningMessage("");
  };

  const handleCheckboxChange = (dia: string) => {
    setDiasSeleccionados((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
    );
  };

  const handleCreateClass = async () => {
    if (
      !nombreClase ||
      !descripcion ||
      !hora ||
      !duracion ||
      diasSeleccionados.length === 0
    ) {
      handleOpenWarningModal("Por favor, completa todos los campos.");
      return;
    }

    // Convertir la hora al formato esperado por la API
    const horario = `${hora}:00.000Z`;

    setLoading(true);
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    const idProfesor = usuario?.id || null;
    const resultado = await createClassRequest(
      nombreClase,
      horario,
      Number(duracion),
      descripcion,
      idProfesor,
      diasSeleccionados
    );

    setLoading(false);

    if (resultado === "Clase creada exitosamente.") {
      onClose(); // Cerrar el modal de creación
      setIsSuccesModalOpen(true); // Mostrar el SuccesModal

      // Ocultar el SuccesModal después de 3 segundos
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } else {
      handleOpenWarningModal(resultado || "Error al crear la clase.");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
        <section className="bg-secondaryOri border-2 border-greyOri p-5 rounded-lg shadow-lg w-[500px] max-w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">Crear Clase</h1>
            <button
              onClick={onClose}
              className="text-greyOri-500 hover:text-greyOri-700"
            >
              ✕
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
              value={nombreClase}
              onChange={(e) => setNombreClase(e.target.value)}
            />
            <TextField
              text="Descripción"
              placeHolder="Describe una breve introducción de tu clase"
              isWithIcon={false}
              isBold={true}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            <TimeField
              text="Hora de entrada"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              isBold={true}
            />
            <TextField
              text="Duración (Minutos)"
              placeHolder="90"
              isWithIcon={true}
              icon={<ClockIcon />}
              isBold={true}
              value={duracion.toString()}
              onChange={(e) => setDuracion(Number(e.target.value) || "")}
            />
            <label className="text-primaryOri font-bold text-sm">
              Días de la semana
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                "Lunes",
                "Martes",
                "Miércoles",
                "Jueves",
                "Viernes",
                "Sábado",
                "Domingo",
              ].map((dia) => (
                <Checkbox
                  key={dia}
                  label={dia}
                  checked={diasSeleccionados.includes(dia)}
                  onChange={() => handleCheckboxChange(dia)}
                />
              ))}
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
            <FillButton
              text={loading ? "Creando..." : "Crear"}
              isWithIcon={false}
              paddingX="px-10"
              onClick={handleCreateClass}
              disabled={loading}
            />
          </div>
        </section>
      </div>

      {isWarningModalOpen && (
        <WarningModal
          isOpen={isWarningModalOpen}
          description={warningMessage}
          onClose={handleCloseWarningModal}
        />
      )}

      {isSuccesModalOpen && (
        <SuccesModal
          isOpen={isSuccesModalOpen}
          description="Clase creada exitosamente."
          onClose={() => setIsSuccesModalOpen(false)}
        />
      )}
    </>
  );
}