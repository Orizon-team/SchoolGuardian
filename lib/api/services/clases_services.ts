import { loginUserRequest } from "../fetch/user_request";

export async function loginUser(email: string, contrasena: string): Promise<string | null> {
  if (!email || !contrasena) {
    console.error("El correo y la contraseña son obligatorios.");
    return null;
  }

  const token = await loginUserRequest(email, contrasena);

  if (!token) {
    console.error("No se pudo obtener el token. Verifica tus credenciales.");
    return null;
  }

  return token;
}