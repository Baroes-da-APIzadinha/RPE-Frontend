import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkAuth } from "@/hooks/checkAuth";
import type { ReactNode } from "react";
import { LoadingScreen } from "@/pages/LoadinScreen";
const PublicRoute = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth().then((user) => {
      setIsAuthenticated(!!user);
    });
  }, []);

  if (isAuthenticated === null) return <LoadingScreen />;

  return isAuthenticated ? <Navigate to="/home" replace /> : children;
};

export default PublicRoute;
