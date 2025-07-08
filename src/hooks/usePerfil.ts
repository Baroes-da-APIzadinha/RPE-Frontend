import { useEffect, useState } from "react";
import { getPerfil } from "@/services/HTTP/perfil";

type Role = "colaborador" | "rh" | "gestor" | "comite" | "lider";

type PerfilData = {
  userId: string;
  userName: string;
  roles: Role[];
  mainRole: Role;
};

const roleMap: Record<string, Role> = {
  RH: "rh",
  GESTOR: "gestor",
  COMITE: "comite",
  COLABORADOR_COMUM: "colaborador",
  LIDER: "lider",
};

// Função para formatar o nome a partir do e-mail
function formatUserName(email: string): string {
  const namePart = email.split("@")[0];
  const words = namePart.split(/[._]/);
  return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

export function usePerfil() {
  const [perfil, setPerfil] = useState<PerfilData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPerfil() {
      try {
        const res = await getPerfil();

        const userId = res.userId || "";
        const rolesFromApi = res.roles || [];

        let finalRoles: Role[] = rolesFromApi
          .map((r: string) => roleMap[r])
          .filter(Boolean) as Role[];

        // Se for admin, dá todas as permissões
        if (rolesFromApi.includes("ADMIN")) {
          finalRoles = ["colaborador", "rh", "gestor", "comite", "lider"];
        }

        const mainRole = finalRoles[0];
        const userName = res.email ? formatUserName(res.email) : "Usuário";

        setPerfil({
          userId,
          userName,
          roles: finalRoles,
          mainRole,
        });
      } catch (err) {
        console.error("Erro ao buscar perfil:", err);
        setPerfil(null);
      } finally {
        setLoading(false);
      }
    }

    fetchPerfil();
  }, []);

  return { perfil, loading };
}
