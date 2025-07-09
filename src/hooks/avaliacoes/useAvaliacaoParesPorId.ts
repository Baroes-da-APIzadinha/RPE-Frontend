// hooks/avaliacoes/useAvaliacaoParesPorId.ts
import { useEffect, useState } from "react";
import { getAvaliacoesPorTipoUsuario } from "@/services/HTTP/avaliacoes";

export function useAvaliacaoParesPorId(idColaborador: string, idAvaliacao: string) {
  const [avaliacao, setAvaliacao] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        const res = await getAvaliacoesPorTipoUsuario(idColaborador, "AVALIACAO_PARES");
        const match = res.avaliacoes.find((a: any) => a.idAvaliacao === idAvaliacao);
        setAvaliacao(match);
      } catch (e) {
        console.error("Erro ao buscar avaliação:", e);
      } finally {
        setLoading(false);
      }
    }

    if (idColaborador && idAvaliacao) fetch();
  }, [idColaborador, idAvaliacao]);

  return { avaliacao, loading };
}
