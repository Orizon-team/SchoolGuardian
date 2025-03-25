"use client";
import React, { useEffect, useState } from "react";
import "../styles/global.css";
import { Header, HeaderToDashboard } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Usuario } from "@/lib/api/models/definitions";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<Usuario | null>(null);

  // Función para obtener el usuario del localStorage
  const GetUserFromLocalStorage = () => {
    const userString = localStorage.getItem("usuario");
    if (userString) {
      const usuario: Usuario = JSON.parse(userString);
      setUser(usuario);
    } else {
      setUser(null); // Si no hay usuario, establece el estado en null
    }
  };

  // Sobrescribir localStorage.setItem para interceptar cambios
  useEffect(() => {
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      const event = new Event("localStorageChange");
      originalSetItem.apply(this, [key, value]);
      window.dispatchEvent(event);
    };

    // Escuchar cambios en el localStorage
    const handleStorageChange = () => {
      GetUserFromLocalStorage();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("localStorageChange", handleStorageChange);

    // Limpieza del evento
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("localStorageChange", handleStorageChange);
      localStorage.setItem = originalSetItem; // Restaurar el método original
    };
  }, []);

  return (
    <html lang="en">
      <body>
        {/* Mostrar HeaderToDashboard si hay un usuario válido, de lo contrario mostrar Header */}
        {user ? <HeaderToDashboard /> : <Header />}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}