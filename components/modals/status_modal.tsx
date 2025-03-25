import { FillButton, OutlineButton } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationTriangle,
  faInfoCircle,
  faTimesCircle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  description: string; // Nueva propiedad para el texto de descripción
}

export function LoadingModal({
  isOpen,
  description = "Cargando...",
}: StatusModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-secondaryOri rounded-lg shadow-lg p-6 w-[300px] flex flex-col items-center">
        <FontAwesomeIcon
          icon={faSpinner}
          className="text-primaryOri w-10 h-10 animate-spin"
        />
        <p className="mt-4 text-gray-600 text-center">{description}</p>
      </div>
    </div>
  );
}

export function SuccesModal({
  isOpen,
  onClose,
  description,
}: StatusModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-secondaryOri rounded-lg shadow-lg p-6 w-[400px]">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-primaryOri w-6 h-6"
            />
            <h2 className="text-xl font-bold text-primaryOri">¡Éxito!</h2>
          </div>
        </div>
        <p className="mt-4 text-gray-600">{description}</p>
      </div>
    </div>
  );
}

export function ErrorModal({ isOpen, onClose, description }: StatusModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-secondaryOri rounded-lg shadow-lg p-6 w-[400px]">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faTimesCircle}
              className="text-errorstate w-6 h-6"
            />
            <h2 className="text-xl font-bold text-errorstate">¡Error!</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <p className="mt-4 text-gray-600">{description}</p>
        <div className="mt-6 flex justify-end">
          <OutlineButton
            text="Aceptar"
            onClick={onClose}
            paddingX="px-4"
            isWithIcon={false}
          />
        </div>
      </div>
    </div>
  );
}

export function InfoModal({ isOpen, onClose, description }: StatusModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-secondaryOri rounded-lg shadow-lg p-6 w-[400px]">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="text-info w-6 h-6"
            />
            <h2 className="text-xl font-bold text-info">¡Información!</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <p className="mt-4 text-gray-600">{description}</p>
        <div className="mt-6 flex justify-end">
          <OutlineButton
            text="Aceptar"
            onClick={onClose}
            paddingX="px-4"
            isWithIcon={false}
          />
        </div>
      </div>
    </div>
  );
}

export function WarningModal({
  isOpen,
  onClose,
  description,
}: StatusModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-secondaryOri rounded-lg shadow-lg p-6 w-[400px]">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className="text-warning w-6 h-6"
            />
            <h2 className="text-xl font-bold text-warning">¡Advertencia!</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <p className="mt-4 text-gray-600">{description}</p>
        <div className="mt-6 flex justify-between items-center">
          <a
            className="font-bold cursor-pointer hover:text-greyOri-950"
            onClick={onClose}
          >
            Cerrar
          </a>
          <OutlineButton
            text="Aceptar"
            onClick={onClose}
            paddingX="px-4"
            paddingY="py-2"
            isWithIcon={false}
          />
        </div>
      </div>
    </div>
  );
}
