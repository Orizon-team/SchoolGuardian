"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { OutlineButton_white, FillButton } from "./button";
import React, { use, useEffect, useState } from "react";
import { get } from "http";
import { ProfileCardModal } from "../modals/profile_teacher_modal";
import { Usuario } from "@/lib/api/models/definitions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";

export function Header() {
  return (
    <header className="bg-primaryOri">
      <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <h1 className="text-secondaryOri text-lg-ori font-bold">
            SCHOOL GUARDIAN
          </h1>
        </Link>
        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/login">
                <button className="px-10 py-3.5 text-sm-ori font-bold text-secondaryOri transition hover:text-greyOri-300">
                  Iniciar Sesión
                </button>
              </Link>
            </li>
            <li>
              <Link href="/sign-up">
                <button className="flex items-center gap-x-2 border-2 border-secondaryOri text-sm-ori text-secondaryOri font-bold rounded-lg py-3.5 px-10 hover:bg-greyOri-300 hover:border-greyOri-300 hover:text-primaryOri">
                  Registrarse
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export function HeaderToDashboard() {
  const [user, setUser] = useState<Usuario | null>(null);

  const [isOpenPerfilModal, setIsOpenPerfilModal] = useState(false);

  const handleOpenPerfilModal = () => {
    setIsOpenPerfilModal(true);
  };
  const handleClosePerfilModal = () => {
    setIsOpenPerfilModal(false);
  };
  const handleCloseSesion = () => {
    //limpiar todo el local storage y las cookies
    localStorage.clear();
    Cookies.remove("token");
    setUser(null);
    window.location.href = "/";
  };

  useEffect(() => {
    const GetUserFromLocalStorage = () => {
      const userString = localStorage.getItem("usuario");
      if (userString) {
        const usuario: Usuario = JSON.parse(userString);
        setUser(usuario);
        console.log("Usuario cargado desde el localStorage", usuario);
      }
    };

    GetUserFromLocalStorage();
  }, []);

  return (
    <header className="bg-primaryOri">
      <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <h1 className="text-secondaryOri text-lg-ori font-bold">
            SCHOOL GUARDIAN
          </h1>
        </Link>
        <nav className="flex-1 flex justify-center items-center">
          <ul className="flex items-center gap-4">
            <li>
              <Link
                href=""
                className="text-secondaryOri text-sm-ori font-bold transition hover:text-greyOri-300"
              >
                Dashboard
              </Link>
            </li>
            {user?.id_tipo === 2 && (
              <li>
                <Link
                  href=""
                  className="text-secondaryOri text-sm-ori font-bold transition hover:text-greyOri-300"
                >
                  Mis clases
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <button
                onClick={handleOpenPerfilModal}
                className="px-10 py-3.5 text-sm-ori font-bold text-secondaryOri transition hover:text-greyOri-300"
              >
                Hi, {user?.nombre}
              </button>
            </li>
            <li>
              <Link href="/">
                <FontAwesomeIcon
                  icon={faArrowAltCircleRight}
                  className="text-secondaryOri text-lg-ori font-bold"
                  onClick={handleCloseSesion}
                />
              </Link>
            </li>
          </ul>
        </nav>
        <ProfileCardModal
          name={user?.nombre ?? "Invitado"}
          email={user?.email ?? "Sin correo"}
          role={user?.id_tipo ?? 0}
          isOpen={isOpenPerfilModal}
          onClose={handleClosePerfilModal}
        />
      </div>
    </header>
  );
}
