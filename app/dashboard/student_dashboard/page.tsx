"use client";

import { useState, useEffect } from "react";
import { SearchField } from "@/components/ui/search_Field";
import { Dropdown } from "@/components/ui/dropdown";
import { Table } from "@/components/ui/table";
import { StatusIndicator } from "@/components/ui/status";
import { GetNowDate } from "@/lib/utils";
import { ProfileCard } from "@/components/ui/perfil_card";
import { Usuario } from "@/lib/api/models/definitions";
import { studentAttendanceRequest } from "@/lib/api/fetch/assists_request";

// Constantes para los filtros
const statusOptions = ["Todos los estados", "A tiempo", "Tarde", "Ausente"];

// Configuración de la tabla
const headers = ["Fecha", "Clases", "Hora de check-in", "Estado"];
const headClassName = ["", "", "text-center", "text-center"];

export default function Student_Dashboard() {
    // Estados del componente
    const [userData, setUserData] = useState<Usuario | null>(null);
    const [rows, setRows] = useState<any[]>([]); // Datos originales
    const [filteredRows, setFilteredRows] = useState<any[]>([]); // Datos filtrados
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');  
    const [availableClasses, setAvailableClasses] = useState<string[]>([]); // Clases disponibles

    // Efecto inicial: Cargar datos del usuario y asistencia
    useEffect(() => {
        const userString = localStorage.getItem('usuario');
        if (userString) {
            const user: Usuario = JSON.parse(userString);
            setUserData(user);
            loadAttendanceData();
        }
    }, []);

    /**
     * Extrae las clases únicas de los datos de asistencia
     * @param data Array de datos de asistencia
     * @returns Array de clases únicas con "Todas las clases" como primera opción
     */
    const extractUniqueClasses = (data: any[]) => {
        const uniqueClasses = new Set<string>();
        data.forEach(item => {
            if (item.nombre_clase) {
                uniqueClasses.add(item.nombre_clase);
            }
        });
        return ["Todas las clases", ...Array.from(uniqueClasses)];
    };

    // Efecto para filtrar los datos cuando cambian los filtros
    useEffect(() => {
        let result = [...rows]; // Copia de los datos originales

        // Filtrado por término de búsqueda
        if (searchTerm.trim() !== '') {
            result = result.filter(row => 
                row[0].toLowerCase().includes(searchTerm.toLowerCase()) || // Fecha
                row[1].toLowerCase().includes(searchTerm.toLowerCase()) || // Clase
                row[2].toLowerCase().includes(searchTerm.toLowerCase())    // Hora
            );
        }

        // Filtrado por clase seleccionada
        if (selectedClass && selectedClass !== "Todas las clases") {
            result = result.filter(row => row[1] === selectedClass);
        }

        // Filtrado por estado de asistencia
        if (selectedStatus && selectedStatus !== "Todos los estados") {
            result = result.filter(row => {
                // Accedemos al texto del componente StatusIndicator
                const statusText = row[3].props.text;
                return statusText === selectedStatus;
            });
        }

        setFilteredRows(result);
    }, [searchTerm, selectedClass, selectedStatus, rows]);

    /**
     * Carga los datos de asistencia desde la API
     */
    const loadAttendanceData = async () => {
        try {
            setLoading(true);
            const attendanceData = await studentAttendanceRequest();
            
            if (attendanceData) {
                // Formateamos los datos para la tabla
                const formattedRows = attendanceData.map(item => {
                    // Formateo de fecha y hora
                    const date = new Date(item.fecha_hora);
                    const formattedDate = date.toLocaleDateString('es-ES', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    }).replace(/\./g, '');
                    
                    const formattedTime = date.toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit'
                    }).replace(/\./g, '');

                    // Configuración del indicador de estado
                    let statusText, bgColor, textColor;
                    switch(item.estatus) {
                        case 'Presente':
                            statusText = 'A tiempo';
                            bgColor = 'bg-greenOri-100';
                            textColor = 'text-successstate';
                            break;
                        case 'Tarde':
                            statusText = 'Tarde';
                            bgColor = 'bg-yellowOri-100';
                            textColor = 'text-warningstate';
                            break;
                        case 'Ausente':
                            statusText = 'Ausente';
                            bgColor = 'bg-redOri-100';
                            textColor = 'text-errostate';
                            break;
                        default:
                            statusText = item.estatus;
                            bgColor = 'bg-gray-100';
                            textColor = 'text-gray-800';
                    }

                    return [
                        formattedDate,
                        item.nombre_clase || `Clase ${item.id_clase}`,
                        formattedTime,
                        <StatusIndicator 
                            text={statusText} 
                            bgColor={bgColor} 
                            textColor={textColor} 
                            showWidth={false} 
                        />
                    ];
                });

                setRows(formattedRows);
                setFilteredRows(formattedRows);
                setAvailableClasses(extractUniqueClasses(attendanceData));
            }
        } catch (error) {
            console.error("Error al cargar la asistencia:", error);
            setRows([]);
            setFilteredRows([]);
            setAvailableClasses([]);
        } finally {
            setLoading(false);
        }
    };

    // Manejadores de eventos
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleClassFilter = (classSelected: string) => {
        setSelectedClass(classSelected);
    };

    const handleStatusFilter = (status: string) => {
        setSelectedStatus(status);
    };

    const getRoleText = (tipo: number) => {
        return tipo === 2 ? "Alumno" : "Usuario";
    };

    return (
        <div className="p-8">
            {/* Encabezado del dashboard */}
            <div className="mb-8">
                <h2 className="text-4xl-ori font-bold text-primaryOri">Dashboard</h2>
                <p className="text-lg-ori text-greyOri-500">{GetNowDate()}</p>
            </div>

            <div className="flex gap-6">
                {/* Sección principal de asistencia */}
                <div className="flex-1 rounded-md p-8 border border-greyOri-200 space-y-4">
                    <div className="space-y-1">
                        <h2 className="text-3xl-ori font-bold text-primaryOri">Historial de Asistencia</h2>
                        <p className="text-base-ori text-greyOri-500">
                            Ver sus registros de asistencia asignados por las maestras
                        </p>
                    </div>

                    {/* Controles de filtrado */}
                    <div className="flex items-center gap-4">
                        <SearchField 
                            placeHolder="Buscar clases" 
                            onChange={handleSearchChange}
                            value={searchTerm} 
                        />
                        <Dropdown 
                            placeholder="Filtrar por clase" 
                            genres={availableClasses} 
                            onSelect={handleClassFilter} 
                        />
                        <Dropdown 
                            placeholder="Filtrar por estado" 
                            genres={statusOptions} 
                            onSelect={handleStatusFilter} 
                        />
                    </div>

                    {/* Tabla de resultados */}
                    <div>
                        {loading ? (
                            <p>Cargando asistencias...</p>
                        ) : filteredRows.length > 0 ? (
                            <Table 
                                headers={headers} 
                                rows={filteredRows} 
                                headClassName={headClassName} 
                            />
                        ) : searchTerm ? (
                            <p>No se encontraron coincidencias para "{searchTerm}"</p>
                        ) : (
                            <p>No hay registros de asistencia</p>
                        )}
                    </div>
                </div>

                {/* Panel de perfil del usuario */}
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