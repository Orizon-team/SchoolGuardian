const URL = "https://assists-api.onrender.com/api/clases";
import { Clase } from "../models/definitions";
import Cookies from "js-cookie";

export async function classTeacherRequest(id: number): Promise<Clase[] | string | null> {
  const token = Cookies.get("token");
  console.log("Token obtenido:", token);

  try {
    console.log("Enviando solicitud a la API...");
    console.log("URL:", URL);
    console.log("Cuerpo de la solicitud:", { id });

    const response = await fetch(`${URL}/usuario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: id,
      }),
    });

    console.log("Estado de la respuesta:", response.status);

    if (!response.ok) {
      console.log("Respuesta no OK:", response);
      if (response.status === 401) {
        return "No autorizado. Verifica tu token.";
      } else if (response.status === 404) {
        return "No se encontraron clases para este profesor.";
      } else {
        return "Ocurrió un error al obtener las clases.";
      }
    }

    const data = await response.json();
    console.log("Datos recibidos de la API:", data);

    const clases: Clase[] = data.map((clase: any) => ({
      id_clase: clase.id_clase,
      nombre_clase: clase.nombre_clase,
      horario: clase.horario,
      duracion: clase.duracion,
      descripcion: clase.descripcion,
      nombreProfesor: undefined, 
      id_profesor: clase.id_profesor,
      codigo_clase: clase.codigo_clase,
      cantidadAlumnos: clase.cantidadAlumnos,
      dias: clase.dias,
    }));

    console.log("Clases mapeadas al modelo Clase:", clases);
    return clases;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    return "Error de red o del servidor.";
  }
}

export async function createClassRequest(
  nombre_clase: string,
  horario: string,
  duracion: number,
  descripcion: string,
  id_profesor: number,
  dias: string[]
): Promise<string | null> {
  const token = Cookies.get("token");
  console.log("Token obtenido:", token);

  // Validar los datos antes de enviar la solicitud
  if (!nombre_clase || !horario || !duracion || !descripcion || id_profesor <= 0 || dias.length === 0) {
    console.error("Error: Datos inválidos antes de enviar la solicitud.", {
      nombre_clase,
      horario,
      duracion,
      descripcion,
      id_profesor,
      dias,
    });
    return "Error: Datos inválidos. Verifica los campos.";
  }

  try {
    console.log("Preparando solicitud para crear una clase...");
    console.log("URL:", `${URL}`);
    console.log("Cuerpo de la solicitud:", {
      nombre_clase,
      horario,
      duracion,
      descripcion,
      id_profesor,
      dias,
    });

    const response = await fetch(`${URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nombre_clase,
        horario,
        duracion,
        descripcion,
        id_profesor,
        dias,
      }),
    });

    console.log("Estado de la respuesta:", response.status);

    if (!response.ok) {
      console.error("Error en la respuesta del servidor:", {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
      });

      if (response.status === 401) {
        return "No autorizado. Verifica tu token.";
      } else if (response.status === 400) {
        const errorData = await response.json();
        console.error("Detalles del error 400:", errorData);
        return "Error en los datos enviados. Verifica el formato.";
      } else if (response.status === 500) {
        console.error("Error interno del servidor. Verifica los logs del backend.");
        return "Error interno del servidor.";
      } else {
        return "Ocurrió un error al crear la clase.";
      }
    }

    const data = await response.json();
    console.log("Clase creada exitosamente:", data);
    return "Clase creada exitosamente.";
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    return "Error de red o del servidor.";
  }
}