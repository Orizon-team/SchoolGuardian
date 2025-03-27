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

        switch (response.status) {
            case 404:
                console.error("Usuario no encontrado.");
                return "Usuario no encontrado, verifique sus credenciales.";

                break;
            case 401:
                console.error("Contraseña incorrecta.");
                return "Contraseña incorrecta, verifique sus credenciales.";
                break;
            case 403:
                console.error("Usuario bloqueado.");
                return "Usuario bloqueado, contacte al administrador.";
                break;

            default:
                break;
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

export async function registerUserRequest(nombre: string, email: string, contrasena: string, id_tipo: number): Promise<Omit<Usuario, "contrasena"> | null | string> {
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

      switch (response.status) {
            case 400:
                console.error("Usuario ya existente en la base de datos.");
                return response.json().then((data) => data.message);
                break;  
           
            case 500:
                console.error("Error en el servidor.");
                return "Error en el servidor, intente más tarde.";
                break;
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


