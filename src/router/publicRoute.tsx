import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkAuth } from "@/hooks/checkAuth";
import { getPerfil } from "@/services/HTTP/perfil";
import type { ReactNode } from "react";
import { LoadingScreen } from "@/pages/LoadinScreen";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAndRedirect() {
      const user = await checkAuth();
      if (!user) {
        setLoading(false);
        return;
      }

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

      setLoading(false);
    }

    checkAndRedirect();
  }, []);

  if (loading) return <LoadingScreen />;
  if (redirectPath) return <Navigate to={redirectPath} replace />;
  return children;
};

export default PublicRoute;
