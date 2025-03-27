"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { OutlineButton_white, FillButton } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/feature_card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faUserGroup,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { GetNowTimeOnSeconds } from "@/lib/utils";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("isLoading:", isLoading);
    handleTokenValidation();
  }, []);

  const handleTokenValidation = async () => {
    console.log("Mostrando el spinner...");

    const token = Cookies.get("token");

    if (!token) {
      console.error("No se encontró un token.");
      return;
    }

    try {
      setIsLoading(true); // Mostrar el modal de carga
      const decodedToken: { exp: number; id_tipo: number } = jwtDecode(token);
      const currentTime = GetNowTimeOnSeconds();

      if (decodedToken.exp < currentTime) {
        console.error("El token ha expirado.");
        setTimeout(() => setIsLoading(false), 3000);
        return;
      }

      console.log("Datos del token decodificado:", decodedToken);
      console.log("El token es válido.");

      // Agregar un pequeño retraso antes de redirigir
      if (decodedToken.id_tipo === 1) {
        setTimeout(() => router.push("/dashboard/teacher_dashboard"), 500);
      } else if (decodedToken.id_tipo === 2) {
        setTimeout(() => router.push("/dashboard/student_dashboard"), 500);
      }
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      setTimeout(() => setIsLoading(false), 3000);
    } finally {
      console.log("Ocultando el spinner...");
      setTimeout(() => setIsLoading(false), 3000);
    }
  };

  return (
    <>
      {/* Modal de carga */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      )}
      {/* Contenido principal */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/school_background_2.jpg"
            alt="Hero"
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
        <div className="z-10 flex flex-col gap-8 items-center justify-center text-center max-w-4xl mx-auto">
          <h1 className="text-5xl-ori text-secondaryOri font-bold">
            Seguimiento de asistencia simple para clases
          </h1>
          <p className="text-xl-ori text-greyOri-50">
            Registre la asistencia, haga un seguimiento del tiempo y administre
            las clases con una interfaz limpia e intuitiva diseñada para la
            eficiencia
          </p>
          <Link href="/login">
            <OutlineButton_white text="Empezar" isWithIcon={false} />
          </Link>
        </div>
      </section>
      <section className="flex items-center justify-center gap-40 p-20 bg-greyOri-50">
        <FeatureCard
          icon={<FontAwesomeIcon icon={faUserGroup} />}
          title="Administra clases"
          description="Crea clases con calendarios personalizados"
        />
        <FeatureCard
          icon={<FontAwesomeIcon icon={faCalendar} />}
          title="Fácil registro"
          description="Captura las asistencias con un solo click. Centra las llegadas en tiempos automaticos"
        />
        <FeatureCard
          icon={<FontAwesomeIcon icon={faChartBar} />}
          title="Analiza tu historial"
          description="Visualiza las asistencias personales e identifica tu progreso "
        />
      </section>
      <section className="flex flex-col items-center justify-center gap-4 p-20 ">
        <h2 className="text-xl font-regular">
          De confianza para profesores de todo el mundo
        </h2>
        <div className="flex gap-8 p-8">
          <FontAwesomeIcon
            icon={faChartBar}
            className="text-primaryOri w-6 h-6"
          />
          <FontAwesomeIcon
            icon={faUserGraduate}
            className="text-primaryOri w-6 h-6"
          />
        </div>
      </section>
      <section className="flex flex-col items-center justify-center gap-4 p-20 bg-greyOri-50 ">
        <h2 className="text-xl font-regular">
          ¿Estás listo para optimizar las asistencias de tus clases?
        </h2>
        <p className="text-greyOri-400 text-sm">
          Únete a millones de personas que ya han simplificado la gestión de sus
          asistencias.
        </p>
        <Link href="/sign-up">
          <FillButton text="Comienza tu prueba gratuita" isWithIcon={false} />
        </Link>
      </section>
      
    </>
  );
}
