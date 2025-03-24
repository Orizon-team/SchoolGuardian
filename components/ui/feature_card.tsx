import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import React from "react";

interface featureCardProps {
  icon: React.ReactElement<any>;
  title: string;
  description: string;
}
export function FeatureCard({ icon, title, description }: featureCardProps) {
  return (
    <section className="flex flex-col items-start gap-2  p-5 rounded-lg  h-50 w-80">
       {icon &&
        React.cloneElement(icon, {
          className: "text-primaryOri w-6 h-5", // Clase aplicada al ícono pasado como prop
        })}
      <h1 className="text-xl">{title}</h1>
      <p className="text-greyOri-400 text-sm">{description}</p>
    </section>
  );
}