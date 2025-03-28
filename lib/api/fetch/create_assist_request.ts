import { getTokenFromCookies } from "@/lib/utils";

const URL = "https://assists-api.onrender.com/api/asistencias";

export async function createAssistanceRequest(
  id_estudiante: number,
  id_clase: number,
  estatus: string,
  fecha_hora: string
): Promise<string | undefined> {
  const token = getTokenFromCookies();
  console.log("Token en creación de asistencia:", token);

  try {
    const requestBody = {
      id_estudiante,
      id_clase,
      estatus,
      fecha_hora,
    };

    console.log("Datos enviados en el cuerpo de la solicitud:", requestBody);

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    console.log("Estado de la respuesta:", response.status);
    console.log("Encabezados de la respuesta:", response.headers);

    // Intentar leer la respuesta completa del servidor
    const responseData = await response.json().catch(() => null);
    console.log("Datos recibidos de la API:", responseData);

    switch (response.status) {
      case 201:
        return "Asistencia creada correctamente";
      case 400:
        console.error("Error 400: Ya existe una asistencia registrada para hoy en esta clase.");
        return "Ya existe una asistencia registrada para hoy en esta clase";
      case 401:
        console.error("Error 401: Token no válido o expirado.");
        return "Token no válido o expirado";
      case 500:
        console.error("Error 500: Error interno del servidor.");
        console.error("Detalles del error:", responseData);
        return "Error interno del servidor";
      default:
        console.error("Error desconocido:", response.status, responseData);
        return "Error desconocido";
    }
  } catch (error) {
    console.error("Error al crear la asistencia:", error);
    return "Error al procesar la solicitud";
  }
}