import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkAuth } from "@/hooks/checkAuth";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth().then((user) => {
      setIsAuthenticated(!!user);
    });
  }, []);

  if (isAuthenticated === null) {
    return <div>Carregando...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
