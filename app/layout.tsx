"use client";
import React, { useEffect, useState } from "react";
import "../styles/global.css";
import { usePathname } from "next/navigation"; // Importar usePathname
import { Header, HeaderToDashboard } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Usuario } from "@/lib/api/models/definitions";
import { LoadingModal } from "@/components/modals/status_modal";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar el modal de carga
  const pathname = usePathname(); // Obtener la ruta actual

  const GetUserFromLocalStorage = () => {
    const userString = localStorage.getItem("usuario");
    if (userString) {
      const usuario: Usuario = JSON.parse(userString);
      setUser(usuario);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    const handleRouteChange = async () => {
      setIsLoading(true); // Activar el modal de carga
      console.log("Cambio de ruta detectado:", pathname);
      await GetUserFromLocalStorage(); // Simular un proceso de carga
      setIsLoading(false); // Desactivar el modal de carga
    };

    handleRouteChange();
  }, [pathname]); // Ejecutar cada vez que cambie la ruta

  useEffect(() => {
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      const event = new Event("localStorageChange");
      originalSetItem.apply(this, [key, value]);
      window.dispatchEvent(event);
    };

    const handleStorageChange = () => {
      GetUserFromLocalStorage();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("localStorageChange", handleStorageChange);

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
        {/* Modal de carga */}
        <LoadingModal
          isOpen={isLoading} // Mostrar el modal si isLoading es true
          description="Cargando..."
          onClose={() => setIsLoading(false)} // Permitir cerrar manualmente si es necesario
        />
      </body>
    </html>
  );
}