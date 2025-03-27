import Cookies from "js-cookie";
// Función para obtener la fecha actual en formato: Lunes, 17 de Marzo, 2025
export function GetNowDate(): string {
  const diasSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const fecha = new Date();
  const diaSemana = diasSemana[fecha.getDay()];
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];
  const anio = fecha.getFullYear();

  return `${diaSemana}, ${dia} de ${mes}, ${anio}`;
}

export function GetNowTimeOnSeconds() {
  return Math.floor(Date.now() / 1000);
}

export function CloseSesion() {
  localStorage.clear();
  Cookies.remove("token");
  window.location.href = "/";
}

export function ExtractHourFromDatabaseFormat(schedule: string): string {
  if (!schedule || schedule === "Invalid date") {
    return "Hora no disponible";
  }

  if (schedule.includes("T")) {
    return new Date(schedule).toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, 
    });
  } else if (schedule.includes(" ")) {
    const time = schedule.split(" ")[1].slice(0, 5); 
    const [hour, minute] = time.split(":").map(Number); 
    const period = hour >= 12 ? "PM" : "AM"; 
    const formattedHour = hour % 12 || 12; 
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
  }
  return schedule;
}