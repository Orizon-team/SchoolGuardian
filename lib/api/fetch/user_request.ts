const URL = "https://assists-api.onrender.com/api/usuarios";

export async function loginUserRequest(email: string, contrasena: string): Promise<string | null> {
    try {
        const response = await fetch(`${URL}/login`, {
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
        return data.token;
    } catch (error) {
        console.error("Error al realizar el fetch:", error);
        return null;
    }
}

export async function registerUserRequest(nombre: string, email: string, contrasena: string, id_tipo: number) {
    try {
        const response = await fetch(`${URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre,
                email,
                contrasena,
                id_tipo,
            }),
        });

        if(!response.ok)
        {
            console.error("Error al insertar un usuario: ", response.statusText);
            return null;
        }

    } catch (error) {

    }

}


