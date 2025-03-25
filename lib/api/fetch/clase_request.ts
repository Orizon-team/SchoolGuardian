const URL = "https://assists-api.onrender.com/api/clases";

export interface ClaseData {
    nombre_clase: string;
    horario: string; // formato ISO (ejemplo: "2025-03-20T10:00:00Z")
    duracion: number;
    id_profesor: number;
    dias: string[]; // Ejemplo: ["Lunes", "Miércoles", "Viernes"]
}

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
