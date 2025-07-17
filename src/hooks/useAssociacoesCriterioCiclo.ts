import { useCallback, useEffect, useState } from "react";
import {
  criarAssociacao,
  buscarPorCiclo,
  atualizarAssociacao,
  removerAssociacao,
  type AssociacaoCriterioCiclo,
  type CreateAssociacaoCriterioCicloDto,
  type UpdateAssociacaoCriterioCicloDto
} from "@/services/HTTP/associacaoCriterioCiclo";

export function useAssociacoesCriterioCiclo(idCiclo: string) {
  const [associacoes, setAssociacoes] = useState<AssociacaoCriterioCiclo[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAssociacoes = useCallback(async () => {
    if (!idCiclo) return;
    setLoading(true);
    try {
      const data = await buscarPorCiclo(idCiclo);
      setAssociacoes(data);
    } catch (err) {
      console.error("Erro ao buscar associações do ciclo:", err);
    } finally {
      setLoading(false);
    }
  }, [idCiclo]);

  const adicionarAssociacao = useCallback(
    async (nova: CreateAssociacaoCriterioCicloDto) => {
      const criada = await criarAssociacao(nova);
      setAssociacoes((prev) => [...prev, criada]);
      return criada;
    },
    []
  );

  const editarAssociacao = useCallback(
    async (id: string, atualizacao: UpdateAssociacaoCriterioCicloDto) => {
      const atualizada = await atualizarAssociacao(id, atualizacao);
      setAssociacoes((prev) =>
        prev.map((a) => (a.idAssociacao === id ? atualizada : a))
      );
      return atualizada;
    },
    []
  );

  const deletarAssociacao = useCallback(
    async (id: string) => {
      await removerAssociacao(id);
      setAssociacoes((prev) => prev.filter((a) => a.idAssociacao !== id));
    },
    []
  );

  useEffect(() => {
    fetchAssociacoes();
  }, [fetchAssociacoes]);

  return {
    associacoes,
    loading,
    fetchAssociacoes,
    adicionarAssociacao,
    editarAssociacao,
    deletarAssociacao,
  };
}
