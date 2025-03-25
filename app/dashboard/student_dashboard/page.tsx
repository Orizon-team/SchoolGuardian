"use client";

import { useState, useEffect } from "react";
import { SearchField } from "@/components/ui/search_Field";
import { Dropdown } from "@/components/ui/dropdown";
import { Table } from "@/components/ui/table";
import { StatusIndicator } from "@/components/ui/status";
import { ProfileCard } from "@/components/ui/perfil_card";
import { Usuario } from "@/lib/api/models/definitions";



const genres = ["Matemáticas", "Historia", "Ciencias Sociales", "Inglés"];
const genres2 = ["Todos los estados", "A tiempo", "Tarde", "Ausente"];

const headers = ["Fecha", "Clases", "Hora de check-in", "Estado"];
const rows = [
    ["Vie, Mar 21, 2025", "Matemáticas", "08:19",
        <StatusIndicator text="A tiempo" bgColor="bg-greenOri-100" textColor="text-successstate" showWidth={false} />],

    ["Sab, Mar 22, 2025", "Historia", "08:20",
        <StatusIndicator text="Tarde" bgColor="bg-yellowOri-100" textColor="text-warningstate" showWidth={false} />],

    ["Dom, Mar 23, 2025", "Ciencias Sociales", "08:35",
        <StatusIndicator text="Ausente" bgColor="bg-redOri-100" textColor="text-errostate" showWidth={false} />],

    ["Lunes, Mar 24, 2025", "Inglés", "08:50",
        <StatusIndicator text="Ausente" bgColor="bg-redOri-100" textColor="text-errostate" showWidth={false} />],
];

const headClassName = ["", "", "text-center", "text-center"];

export default function Student_Dasboard() {
    const [userData, setUserData] = useState<Usuario | null>(null);

    useEffect(() => {
        // Obtener datos del localStorage al cargar el componente
        const userString = localStorage.getItem('usuario');
        if (userString) {
            const user: Usuario = JSON.parse(userString);
            setUserData(user);
        }
    }, []);

    const getRoleText = (tipo: number) => {
        switch(tipo) {
            case 2: return "Alumno";
            // Agrega más casos según necesites
            default: return "Usuario";
        }
    };

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
                <div className="flex-1 rounded-md p-8 border border-greyOri-200 space-y-4">
                    <div className="space-y-1">
                        <h2 className="text-3xl-ori font-bold text-primaryOri">
                            Historial de Asistencia
                        </h2>
                        <p className="text-base-ori text-greyOri-500">
                            Ver sus registros de asistencia asignados por las maestras
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <SearchField placeHolder="Buscar clases" />
                        <Dropdown placeholder="Filtrar por clase" genres={genres} />
                        <Dropdown placeholder="Filtrar por estado" genres={genres2} />
                    </div>

                    <div>
                        <Table headers={headers} rows={rows} headClassName={headClassName} />
                    </div>
                </div>

                <div>
                    {userData ? (
                        <ProfileCard
                            name={userData.nombre}
                            email={userData.email}
                            role={getRoleText(userData.id_tipo)}
                            width="w-96"
                        />
                    ) : (
                        <ProfileCard
                            name="Cargando..."
                            email=""
                            role=""
                            width="w-96"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}