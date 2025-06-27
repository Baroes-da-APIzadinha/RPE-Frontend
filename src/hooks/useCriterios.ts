// hooks/useCriterios.ts
import { createCriterio, deleteCriterio, getCriterioById, getCriterioByPilar, updateCriterio, type Criterio } from "@/services/HTTP/criterio";
import { useCallback, useState } from "react";


type Pilar =
  | "Comportamento"
  | "Execucao"
  | "Gestao_e_Lideranca";

export function useCriterios() {
  const [loading, setLoading] = useState(false);
  const [criterios, setCriterios] = useState<Record<Pilar, Criterio[]>>({
    Comportamento: [],
    Execucao: [],
    Gestao_e_Lideranca: [],
  });

  const fetchCriteriosByPilar = useCallback(async (pilar: Pilar) => {
    try {
      setLoading(true);
      const data = await getCriterioByPilar(pilar);
      setCriterios((prev) => ({ ...prev, [pilar]: data }));
    } catch (err) {
      console.error(`Erro ao buscar critérios de ${pilar}:`, err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllPilares = useCallback(async () => {
    await Promise.all([
      fetchCriteriosByPilar("Comportamento"),
      fetchCriteriosByPilar("Execucao"),
      fetchCriteriosByPilar("Gestao_e_Lideranca"),
    ]);
  }, [fetchCriteriosByPilar]);

  const adicionarCriterio = useCallback(
    async (novo: {
      nomeCriterio: string;
      descricao: string;
      pilar: Pilar;
      peso: string;
      obrigatorio: boolean;
    }) => {
      const criado = await createCriterio(novo);
      await fetchCriteriosByPilar(novo.pilar);
      return criado;
    },
    [fetchCriteriosByPilar]
  );

  const editarCriterio = useCallback(
    async (
      id: string,
      atualizacao: Partial<{
        nomeCriterio: string;
        descricao: string;
        pilar: Pilar;
        peso: string;
        obrigatorio: boolean;
      }>
    ) => {
      const atualizado = await updateCriterio(id, atualizacao);
      const criterioAtualizado = await getCriterioById(id);
      await fetchCriteriosByPilar(criterioAtualizado.pilar);
      return atualizado;
    },
    [fetchCriteriosByPilar]
  );

  const removerCriterio = useCallback(
    async (id: string, pilar: Pilar) => {
      await deleteCriterio(id);
      await fetchCriteriosByPilar(pilar);
    },
    [fetchCriteriosByPilar]
  );

  return {
    criterios,
    loading,
    fetchAllPilares,
    fetchCriteriosByPilar,
    adicionarCriterio,
    editarCriterio,
    removerCriterio,
  };
}
