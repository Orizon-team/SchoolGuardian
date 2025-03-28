import { getTokenFromCookies } from "@/lib/utils";
import { Asistencia } from "../models/definitions";

const URL = "https://assists-api.onrender.com/api/asistencias/usuario";

export async function createAssistanceRequest( id_estudiante: number, id_clase:number, estatus:string, fecha_hora:string) : Promise<string | undefined>
{
    const token = getTokenFromCookies();
    try {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                id_estudiante,
                id_clase,
                estatus,
                fecha_hora
            }),

        });

        if(response.status === 500)
        {
           return "Error interno del servidor";
        }
        if(response.status === 401)
        {
            //Aquí debes poner el método de cerrar la sesión
            return "Token expirado";
        }
        
        
    } catch (error) {
        console.error("Error al crear la asistencia:", error);  
    }
}