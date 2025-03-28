import Cookies from "js-cookie";
import { CloseSesion } from "@/lib/utils";
import { Alumno } from "../models/definitions";
const URL = "https://assists-api.onrender.com/api/inscripciones/clase";

export async function getStudentsRequest(id_clase: string): Promise<Alumno[] | null> {
  const token = Cookies.get("token");
  console.log("Token obtenido:", token);

  try {
    console.log("Preparando solicitud a la API...");
    console.log("URL:", URL);
    console.log("Cuerpo de la solicitud:", { id_clase });

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id_clase }),
    });

    console.log("Estado de la respuesta:", response.status);
    console.log("Encabezados de la respuesta:", response.headers);

    if (response.status === 401) {
      console.log("Token no válido o expirado. Redirigiendo al login...");
      CloseSesion(); 
      return null;
    }

    if (!response.ok) {
      console.log("Error en la respuesta de la API:", {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
      });
      throw new Error(`Error al obtener los alumnos: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Datos recibidos de la API:", data);

    if (data && Array.isArray(data.alumnos)) {
      console.log("Alumnos obtenidos:", data.alumnos);
      return data.alumnos as Alumno[];
    } else {
      console.log("La respuesta no contiene un arreglo de alumnos válido.");
      return null;
    }
  } catch (error) {
    console.log("Error en la solicitud:", error);
    return null;
  }
}