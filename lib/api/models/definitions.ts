//Plasmar cada uno de los tipos de datos en un archivo por separado
export type TipoUsuario = {
  id_tipo_usuario: number;
  nombre: string;
};

export type Usuario = {
  id_usuario: number;
  nombre: string;
  email: string;
  contrasena: string;
  id_tipo: number;
  intentos: number;
};

export type Clase = {
  id_clase: number;
  nombre_clase: string;
  horario: string;
  duracion: number;
  id_profesor: number;
  codigo_clase: string;
};

export type ClaseDias = {
  id_clase_dia: number;
  id_clase: number;
  dia_semana: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';
};

export type Inscripcion = {
  id_inscripcion: number;
  id_clase: number;
  id_estudiante: number;
  fecha_inscripcion: string;
};

export type Asistencia = {
  id_asistencia: number;
  id_estudiante: number;
  id_clase: number;
  estatus: 'Presente' | 'Ausente' | 'Tarde';
  fecha_hora: string;
};

export type UsuarioForm = {
  nombre: string;
  email: string;
  contrasena: string;
  id_tipo_usuario: number;
};

export type ClaseForm = {
  nombre_clase: string;
  horario: string;
  duracion: number;
  id_profesor: number;
  codigo_clase: string;
};

export type ClaseDiasForm = {
  id_clase: number;
  dia_semana: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';
};

export type InscripcionForm = {
  id_clase: number;
  id_estudiante: number;
};

export type AsistenciaForm = {
  id_estudiante: number;
  id_clase: number;
  estatus: 'Presente' | 'Ausente' | 'Tarde';
  fecha_hora: string;
};

// Tipos para datos mostrados en tablas o listas
export type UsuarioTabla = Usuario & {
  tipo_usuario: string;
};

export type ClaseTabla = Clase & {
  nombre_profesor: string;
  dias_semana: string;
};

export type InscripcionTabla = Inscripcion & {
  nombre_estudiante: string;
  nombre_clase: string;
};

export type AsistenciaTabla = Asistencia & {
  nombre_estudiante: string;
  nombre_clase: string;
};