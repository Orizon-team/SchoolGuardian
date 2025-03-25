import Cookies from 'js-cookie';
import { Usuario } from "../models/definitions";

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
        Cookies.set("token", data.token, { expires: 7, secure: true, sameSite: "Strict" });
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        console.log("Inicio de sesión exitoso. Token y datos del usuario guardados.");
        
        return data.token;
    } catch (error) {
        console.error("Error al realizar el fetch:", error);
        return null;
    }
}

export async function registerUserRequest(nombre: string, email: string, contrasena: string, id_tipo: number): Promise<Omit<Usuario, "contrasena"> | null> {
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

        if (!response.ok) {
            console.error("Error al insertar un usuario: ", response.statusText);
            return null;
        }
        const data: Usuario = await response.json();

        const { contrasena: _, ...usuarioSinContrasena } = data;


        console.log("Usuario registrado exitosamente:", usuarioSinContrasena);
        return data;

    } catch (error) {
        console.error("Error al realizar la solicitud:", error);
        return null;
    }
}


