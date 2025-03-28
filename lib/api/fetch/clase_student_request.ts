// lib/api/fetch/classStudentRequest.ts
import Cookies from 'js-cookie';
import { Clase } from '@/lib/api/models/definitions';

export async function classStudentRequest(): Promise<Clase[] | null> {
  try {
    // 1. Obtener datos de autenticación
    const userString = localStorage.getItem('usuario');
    const token = Cookies.get('token');
    
    // 2. Validar datos requeridos
    if (!userString || !token) {
      throw new Error('Se requiere autenticación: faltan datos de usuario o token');
    }

    // 3. Extraer ID del estudiante
    const { id } = JSON.parse(userString);

    // 4. Configurar y ejecutar la petición
    const response = await fetch('https://assists-api.onrender.com/api/clases/alumno', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ id_estudiante: id })
    });

    // 5. Manejar respuesta
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Solicitud fallida con estado ${response.status}`);
    }

    // 6. Retornar datos
    const data: Clase[] = await response.json();
    return data;

  } catch (error) {
    console.error('Error en classStudentRequest:', error);
    return null;
  }
}

export async function deleteClassStudentRequest(ClassId: number): Promise<boolean> {
  try {
    // 1. Obtener token de autenticación
    const token = Cookies.get('token');
    if (!token) {
      throw new Error('Token de autenticación no encontrado');
    }

    // 2. Configurar y ejecutar petición DELETE
    const response = await fetch(`https://assists-api.onrender.com/api/inscripciones/${ClassId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // 3. Manejar respuesta
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Error al eliminar: ${response.status}`);
    }

    return true;

  } catch (error) {
    console.error('Error en deleteClassInscription:', error);
    return false;
  }
}