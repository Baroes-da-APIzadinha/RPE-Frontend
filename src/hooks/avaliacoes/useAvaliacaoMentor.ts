import { useEffect, useState } from "react";
import { getRequest } from "@/services/HTTP/requests";
import type { AvaliacaoMentor } from "@/types/Autoavaliacao";

export function useAvaliacaoMentor(idUsuario: string) {
  const [avaliacao, setAvaliacao] = useState<AvaliacaoMentor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        const res = await getRequest(
          `/avaliacoes/tipo/usuario/${idUsuario}?tipoAvaliacao=COLABORADOR_MENTOR`
        );
        if (res.avaliacoes && res.avaliacoes.length > 0) {
          setAvaliacao(res.avaliacoes[0]);
        }
        console.log("Response:", res)
      } catch (err) {
        console.error("Erro ao buscar avaliação de mentor:", err);
      } finally {
        setLoading(false);
      }
    }

    fetch();
  }, [idUsuario]);

  return { avaliacao, loading };
}
