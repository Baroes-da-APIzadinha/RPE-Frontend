// src/hooks/useAvaliacoesPares.ts
import { useEffect, useState } from "react";
import { getAvaliacoesPorTipoUsuario } from "@/services/HTTP/avaliacoes";

type AvaliacaoPares = {
  idAvaliacao: string;
  idCiclo: string;
  idAvaliador: string;
  idAvaliado: string;
  status: string;
  tipoAvaliacao: "AVALIACAO_PARES";
  avaliacaoPares: {
    idAvaliacao: string;
    nota: string;
    motivadoTrabalharNovamente: string;
    pontosFortes: string;
    pontosFracos: string;
  } | null;
  ciclo: {
    idCiclo: string;
    nomeCiclo: string;
    status: string;
    dataInicio: string;
    dataFim: string;
  };
  avaliador: {
    nomeCompleto: string;
  };
  avaliado: {
    nomeCompleto: string;
  };
};


export function useAvaliacoesPares(idColaborador: string) {
  const [avaliacoes, setAvaliacoes] = useState<AvaliacaoPares[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAvaliacoes() {
      try {
        const res = await getAvaliacoesPorTipoUsuario(idColaborador, "AVALIACAO_PARES");
        setAvaliacoes(res.avaliacoes || []);
        console.log("Avaliações recebidas", res)
      } catch (err) {
        console.error("Erro ao buscar avaliações de pares:", err);
      } finally {
        setLoading(false);
      }
    }

    if (idColaborador) fetchAvaliacoes();
  }, [idColaborador]);

  return { avaliacoes, loading };
}
