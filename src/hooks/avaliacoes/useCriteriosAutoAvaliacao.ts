import { useEffect, useState } from "react";
import { getCriteriosAutoAvaliacao } from "@/services/HTTP/avaliacoes";
import type { PilarCriterios } from "@/types/Autoavaliacao";

export function useCriteriosAutoAvaliacao(idAvaliacao?: string) {
  const [loading, setLoading] = useState(true);
  const [criterios, setCriterios] = useState<PilarCriterios>({});

  useEffect(() => {
    const fetch = async () => {
      if (!idAvaliacao) return;
      try {
        const res = await getCriteriosAutoAvaliacao(idAvaliacao);
        setCriterios(res);
      } catch (err) {
        console.error("Erro ao buscar critérios:", err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [idAvaliacao]);

  return { criterios, loading };
}
