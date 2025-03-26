// lib/api/fetch/attendance.ts
import Cookies from 'js-cookie';
import { Asistencia } from '@/lib/api/models/definitions';

export async function studentAttendanceRequest(): Promise<Asistencia[] | null> {
  try {
    // 1. Obtener credenciales
    const userString = localStorage.getItem('usuario');
    const token = Cookies.get('token');
    
    if (!userString || !token) {
      throw new Error('Se requiere autenticación');
    }

    const { id } = JSON.parse(userString);

    // 2. Hacer la petición
    const response = await fetch('https://assists-api.onrender.com/api/asistencias/usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ id })
    });

    // 3. Validar respuesta
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data: Asistencia[] = await response.json();
    return data;

  } catch (error) {
    console.error('Error al obtener la asistencia:', error);
    return null;
  }
}