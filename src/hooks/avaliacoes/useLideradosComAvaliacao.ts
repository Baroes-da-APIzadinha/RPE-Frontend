import { useQuery } from "@tanstack/react-query";
import {
  getLideradosPorCiclo,
  getAvaliacoesPorTipoUsuario,
} from "@/services/HTTP/avaliacoes";

// Tipos de retorno esperados
interface Liderado {
  idColaborador: string;
  nomeCompleto: string;
  cargo: string | null;
  notaAutoavaliacao: number | null;
  notaLider: number | null;
  statusAutoavaliacao: string;
  statusAvaliacao360: string;
}

interface LideradosPorCicloResponse {
  avaliador: {
    id: string;
    nomeLider: string;
  };
  liderados: Liderado[];
}

interface CardAvaliacao {
  nomeCriterio: string;
  nota: string;
  justificativa: string;
}

interface AvaliacaoLider {
  idAvaliado: string;
  idAvaliacao: string;
  status: string;
  avaliacaoLiderColaborador?: {
    cardAvaliacaoLiderColaborador: CardAvaliacao[];
  };
}

interface AvaliacoesResponse {
  avaliacoes: AvaliacaoLider[];
}

export function useLideradosComAvaliacao(idColaborador: string, idCiclo: string) {
  const lideradosQuery = useQuery<LideradosPorCicloResponse>({
    queryKey: ["liderados", idColaborador, idCiclo],
    queryFn: () => getLideradosPorCiclo(idColaborador, idCiclo),
    enabled: !!idColaborador && !!idCiclo,
  });

  const avaliacoesQuery = useQuery<AvaliacoesResponse>({
    queryKey: ["avaliacoes-lider", idColaborador, idCiclo],
    queryFn: () =>
      getAvaliacoesPorTipoUsuario(idColaborador, "LIDER_COLABORADOR", idCiclo),
    enabled: !!idColaborador && !!idCiclo,
  });

  const isLoading = lideradosQuery.isLoading || avaliacoesQuery.isLoading;

  const dadosCompletos =
    lideradosQuery.data?.liderados.map((colab) => {
      const avaliacao = avaliacoesQuery.data?.avaliacoes.find(
        (av) => av.idAvaliado === colab.idColaborador
      );

      return {
        ...colab,
        idAvaliacaoLider: avaliacao?.idAvaliacao,
        statusAvaliacaoLider: avaliacao?.status,
        cardsPreenchidos:
          avaliacao?.avaliacaoLiderColaborador?.cardAvaliacaoLiderColaborador ?? [],
      };
    }) ?? [];

  return {
    liderados: dadosCompletos,
    isLoading,
  };
}
