"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faIdBadge } from "@fortawesome/free-regular-svg-icons";
import React from "react";
import { SpecialRedButton } from "@/components/ui/button";
import { TrashIcon } from "@heroicons/react/24/outline";

interface ProfileCardProps {
  name: string;
  email: string;
  role: string;
}

export function ProfileCard({ name, email, role }: ProfileCardProps) {
  return (
    <section className="bg-secondaryOri border-2 border-greyOri p-5 rounded-lg shadow-lg w-80">
      <h1 className="text-xl font-bold mb-4">Perfil</h1>
      <p className="text-sm text-greyOri-400 mb-4">Información de tu cuenta</p>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <FontAwesomeIcon icon={faUser} className="text-primaryOri w-5 h-5" />
          <label className="text-sm text-primaryOri font-sm">{name}</label>
        </div>
        <div className="flex gap-4 items-center">
          <FontAwesomeIcon icon={faEnvelope} className="text-primaryOri w-5 h-5" />
          <label className="text-sm text-primaryOri font-sm">{email}</label>
        </div>
        <div className="flex gap-4 items-center">
          <FontAwesomeIcon icon={faIdBadge} className="text-primaryOri w-5 h-5" />
          <label className="text-sm text-primaryOri font-sm">{role}</label>
        </div>
      </div>
    </section>
  );
}
