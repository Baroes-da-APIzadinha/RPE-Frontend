import { useEffect, useState } from "react";
import { getPerfil } from "@/services/HTTP/perfil";

export function useRedirectByRole() {
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function defineRedirect() {
      try {
        const res = await getPerfil();
        const roles: string[] = res.roles || [];

        if (roles.includes("ADMIN") || roles.includes("RH")) {
          setRedirectPath("/rh/dashboard");
        } else if (roles.includes("GESTOR")) {
          setRedirectPath("/gestor/dashboard");
        } else if (roles.includes("COMITE")) {
          setRedirectPath("/comite/historico");
        } else {
          setRedirectPath("/colaborador/home");
        }
      } catch (err) {
        console.error("Erro ao buscar perfil para redirecionamento", err);
      } finally {
        setLoading(false);
      }
    }

    defineRedirect();
  }, []);

  return { redirectPath, loading };
}
