"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/userContext"; // Asegúrate de que la ruta sea correcta
import { Loader2 } from "lucide-react";

const RedirectIfNotLoggedIn = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoggedIn } = useUser();
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/"); // Redirige al usuario a la página de login si no está logueado
    } else {
      const isAdmin = user!.email === "ricardocastellob@gmail.com";
      if (!isAdmin) router.push("/");
      else {
        setLoading(false); // Autenticado, actualiza el estado de carga
      }
    }
  }, [isLoggedIn, router, user]);

  if (loading) {
    return (
      <div className="w-full mt-24 fles justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="size-8 animate-spin text-zinc-500" />
          <h3 className="font-semibold text-xl">Checking authority...</h3>
          <p className="animate-pulse">Please wait</p>
        </div>
      </div>
    );
  }

  return <>{children}</>; // No renderiza nada
};

export default RedirectIfNotLoggedIn;
