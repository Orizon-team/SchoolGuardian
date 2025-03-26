import { get } from 'http';
import { url } from "inspector";
import { cookies } from "next/headers";

const URL = "https://assists-api.onrender.com/api/clases/usuario";

export async function createClaseRequest(
    claseData: ClaseData,
    token: string
): Promise<any | null> {
    try {
        const response = await fetch(`${URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(claseData),
        });

        if (!response.ok) {
            console.error("Error en la solicitud:", response.statusText);
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al realizar el fetch:", error);
        return null;
    }
}

export async function GetAllClassesOfTeacher(id_profesor: number)
{
    const token = cookies.get
    try {
        const reponse = await fetch(`${URL}/:${id_profesor}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${token}`

            },
            body: JSON.stringify(
                {
                    id_
                }
            );

        })
        
        
    } catch (error) {
        
    }

}