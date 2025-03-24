import { SearchField } from "@/components/ui/search_Field";
import { Dropdown } from "@/components/ui/dropdown";
import { Table } from "@/components/ui/table";
import { StatusIndicator } from "@/components/ui/status";
import { ProfileCard } from "@/components/ui/perfil_card";

const genres = ["Matemáticas", "Historia", "Ciencias Sociales", "Inglés"];
const genres2 = ["Todos los estados", "A tiempo", "Tarde", "Ausente"];

const headers = ["Fecha", "Clases", "Hora de check-in", "Estado"];
const rows = [
    ["Vie, Mar 21, 2025", "Matemáticas", "08:19",
        <StatusIndicator text="A tiempo" bgColor="bg-greenOri-100" textColor="text-successstate" />],

    ["Sab, Mar 22, 2025", "Historia", "08:20",
        <StatusIndicator text="Tarde" bgColor="bg-yellowOri-100" textColor="text-warningstate" />],

    ["Dom, Mar 23, 2025", "Ciencias Sociales", "08:35",
        <StatusIndicator text="Ausente" bgColor="bg-redOri-100" textColor="text-errostate" />],

    ["Lunes, Mar 24, 2025", "Inglés", "08:50",
        <StatusIndicator text="Ausente" bgColor="bg-redOri-100" textColor="text-errostate" />],
];

const headClassName = ["", "", "text-center", "text-center"];

export default function Student_Dasboard() {
    return (
        <div className="p-8">
            <div className="mb-8">
                <h2 className="text-4xl-ori font-bold text-primaryOri">
                    Dashboard
                </h2>
                <p className="text-lg-ori text-greyOri-500">
                    Lunes, Marzo 17, 2025
                </p>
            </div>

            <div className="flex gap-6">
                {/* Contenedor del Historial de Asistencia */}
                <div className="flex-1 rounded-md p-8 border border-greyOri-200 space-y-4">
                    {/* Título y descripción */}
                    <div className="space-y-1">
                        <h2 className="text-3xl-ori font-bold text-primaryOri">
                            Historial de Asistencia
                        </h2>
                        <p className="text-base-ori text-greyOri-500">
                            Ver sus registros de asistencia asignados por las maestras
                        </p>
                    </div>

                    {/* Filtros de búsqueda */}
                    <div className="flex items-center gap-4">
                        <SearchField placeHolder="Buscar clases" />
                        <Dropdown placeholder="Filtrar por clase" genres={genres} />
                        <Dropdown placeholder="Filtrar por estado" genres={genres2} />
                    </div>

                    {/* Tabla de asistencia */}
                    <div>
                        <Table headers={headers} rows={rows} headClassName={headClassName} />
                    </div>
                </div>

                {/* ProfileCard (fuera del borde, al lado derecho) */}
                <div> {/* Ajusta el ancho según tus necesidades */}
                    <ProfileCard
                        name="John Doe"
                        email="john.doe@example.com"
                        role="Estudiante"
                        width="w-96"
                    />
                </div>
            </div>
        </div>
    );
}