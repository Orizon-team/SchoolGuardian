"use client";
import React, { useEffect, useState } from "react";
import "../styles/global.css";
import { usePathname } from "next/navigation";
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
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

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
      setIsLoading(true);
      console.log("Cambio de ruta detectado:", pathname);
      await GetUserFromLocalStorage();
      setIsLoading(false);
    };

    handleRouteChange();
  }, [pathname]);

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
      localStorage.setItem = originalSetItem;
    };
  }, []);

  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen flex flex-col">
        {user ? <HeaderToDashboard /> : <Header />}
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <LoadingModal
          isOpen={isLoading}
          description="Cargando..."
          onClose={() => setIsLoading(false)}
        />
      </body>
    </html>
  );
}