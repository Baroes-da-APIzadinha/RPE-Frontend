import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkAuth } from "@/hooks/checkAuth";
import type { ReactNode } from "react";
const PublicRoute = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth().then((user) => {
      setIsAuthenticated(!!user);
    });
  }, []);

  if (isAuthenticated === null) return <div>Carregando...</div>;

  return isAuthenticated ? <Navigate to="/home" replace /> : children;
};

export default PublicRoute;
