import { useEffect, useState } from "react";
import Cookies from "js-cookie";
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
  MEMBRO_COMITE: "comite",
  COLABORADOR_COMUM: "colaborador",
  LIDER: "lider",
};

function formatUserName(email: string): string {
  return email
    .split("@")[0]
    .split(/[._]/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function usePerfil() {
  const [perfil, setPerfil] = useState<PerfilData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /** 1) Tenta ler o cookie primeiro */
    const cookie = Cookies.get("perfil");

    if (cookie) {
      try {
        const parsed: PerfilData = JSON.parse(cookie);
        setPerfil(parsed);
        setLoading(false);
        return;           
      } catch (err) {
        console.warn("Cookie de perfil corrompido, removendo…");
        Cookies.remove("perfil");
      }
    }

    /** 2) Caso não haja cookie válido, faz a request */
    async function fetchPerfil() {
      try {
        const res = await getPerfil();

        const rolesFromApi: string[] = res.roles ?? [];
        let finalRoles: Role[] = rolesFromApi
          .map(r => roleMap[r])
          .filter(Boolean) as Role[];

        if (rolesFromApi.includes("ADMIN")) {
          finalRoles = ["colaborador", "rh", "gestor", "comite", "lider"];
        }

        const perfilData: PerfilData = {
          userId: res.userId ?? "",
          userName: res.email ? formatUserName(res.email) : "Usuário",
          roles: finalRoles,
          mainRole: finalRoles[0],
        };

        setPerfil(perfilData);
        /** 3) Salva em cookie para as próximas vezes */
        Cookies.set("perfil", JSON.stringify(perfilData), { expires: 7 });
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
