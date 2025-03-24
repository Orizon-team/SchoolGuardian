export async function fetchToken(email: string, contrasena: string): Promise<string | null> {
    try {
        const response = await fetch("https://assists-api.onrender.com/api/usuarios/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                contrasena,
            }),
        });

        if (!response.ok) {
            console.error("Error en la solicitud:", response.statusText);
            return null;
        }

        const data = await response.json();
        return data.token; // Suponiendo que el token viene en la propiedad "token"
    } catch (error) {
        console.error("Error al realizar el fetch:", error);
        return null;
    }
}