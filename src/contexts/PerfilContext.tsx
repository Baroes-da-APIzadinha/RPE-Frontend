import { createContext, useContext } from "react";
import { usePerfil } from "@/hooks/usePerfil";

type Role = "colaborador" | "rh" | "gestor" | "comite" | "lider";

type PerfilData = {
  userId: string;
  userName: string;
  roles: Role[];
  mainRole: Role;
};

type PerfilContextType = {
  perfil: PerfilData | null;
  loading: boolean;
};

const PerfilContext = createContext<PerfilContextType | undefined>(undefined);

export const PerfilProvider = ({ children }: { children: React.ReactNode }) => {
  const { perfil, loading } = usePerfil();

  return (
    <PerfilContext.Provider value={{ perfil, loading }}>
      {children}
    </PerfilContext.Provider>
  );
};

export function usePerfilContext() {
  const context = useContext(PerfilContext);
  if (!context) {
    throw new Error("usePerfilContext precisa estar dentro de <PerfilProvider>");
  }
  return context;
}
