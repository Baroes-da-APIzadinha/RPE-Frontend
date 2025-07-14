// hooks/avaliacoes/useAutoAvaliacaoId.ts
import { useEffect, useState } from "react";
import { getAutoAvaliacaoByUserId } from "@/services/HTTP/avaliacoes";
import type {
  UseAutoAvaliacaoIdReturn,
  RespostaAutoAvaliacao,
  AutoAvaliacaoApiResponse,
} from "@/types/Autoavaliacao";

export function useAutoAvaliacaoId(userId: string | undefined): UseAutoAvaliacaoIdReturn {
  const [idAvaliacao, setIdAvaliacao] = useState<string | null>(null);
  const [respostas, setRespostas] = useState<RespostaAutoAvaliacao[] | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);

    getAutoAvaliacaoByUserId(userId)
      .then((data: AutoAvaliacaoApiResponse) => {
        const avaliacao = data.avaliacoes?.[0];
        setIdAvaliacao(avaliacao?.idAvaliacao ?? null);
        setStatus(avaliacao?.status ?? null);

        const respostasConvertidas = avaliacao?.autoAvaliacao?.cardAutoAvaliacoes?.map((card) => ({
          nomeCriterio: card.nomeCriterio,
          nota: Number(card.nota),
          justificativa: card.justificativa,
        })) ?? [];

        setRespostas(respostasConvertidas);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return { idAvaliacao, respostas, status, loading };
}
