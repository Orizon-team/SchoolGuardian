"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter(); 

  useEffect(() => {
    const user = localStorage.getItem("usuario");
    if (user) {
      setIsAuthenticated(true);
    } else {
      router.replace("/login");
    }
  }, [router]);


  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" className="text-primaryOri w-5 h-5" />
      </div>
    );
  }

  return <section>{children}</section>;
}