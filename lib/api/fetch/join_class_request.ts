import Cookies from 'js-cookie';

interface UsuarioLocalStorage {
  id: number;
  email: string;
  nombre: string;
  tipo: number;
}

export async function joinClassRequest(codigo_clase: string): Promise<boolean> {
  // 1. Obtener datos del localStorage y cookies
  const usuarioString = localStorage.getItem('usuario');
  const token = Cookies.get('token');

  if (!usuarioString || !token) {
    console.error('Error: No se encontró el usuario en localStorage o el token en cookies.');
    return false;
  }

  const usuario: UsuarioLocalStorage = JSON.parse(usuarioString);
  const id_estudiante = usuario.id;

  // 2. Preparar el cuerpo de la petición
  const body = {
    codigo_clase,
    id_estudiante,
  };

  try {
    // 3. Hacer la petición POST
    const response = await fetch('https://assists-api.onrender.com/api/inscripciones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error en la inscripción. Detalles:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      return false;
    }

    const responseData = await response.json();
    return true;
  } catch (error) {
    console.error('Error al conectar con la API. Detalles:', {
      error: error instanceof Error ? error.message : error
    });
    return false;
  }
}