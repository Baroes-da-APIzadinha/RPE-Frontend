import { useQuery } from "@tanstack/react-query";
import { getLideradosPorCiclo, getAvaliacoesPorTipoUsuario } from "@/services/HTTP/avaliacoes";
import type {
  LideradosPorCicloResponse,
  AvaliacoesResponse,
  Liderado,
  Status,
} from "@/types/AvaliacaoLider";

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

  const dadosCompletos: (Liderado & {
    statusAvaliacaoLider: Status;
    cardsPreenchidos: {
      nomeCriterio: string;
      nota: string;
      justificativa: string;
    }[];
  })[] = (lideradosQuery.data?.liderados ?? []).map((colab) => {
    const avaliacao = avaliacoesQuery.data?.avaliacoes.find(
      (av) => av.idAvaliado === colab.idColaborador
    );

    return {
      ...colab,
      idAvaliacaoLider: avaliacao?.idAvaliacao ?? "",
      statusAvaliacaoLider: avaliacao?.status as Status,
      cardsPreenchidos:
        avaliacao?.avaliacaoLiderColaborador?.cardAvaliacaoLiderColaborador ?? [],
    };
  });

  return {
    liderados: dadosCompletos,
    isLoading,
  };
}
