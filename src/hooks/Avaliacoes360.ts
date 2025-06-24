import { useEffect, useState } from "react";

type Avaliacao360 = {
    id: number;
    nota: number;
    motivacao: string | null;
    forte: string;
    melhoria: string;
    status: "pendente" | "andamento" | "avaliado";
};

const STORAGE_KEY = "avaliacoes360";

export function useAvaliacoes360() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao360[]>(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  });

   useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(avaliacoes));
  }, [avaliacoes]);

  const salvarAvaliacao = (nova: Avaliacao360) => {
    setAvaliacoes((prev) => {
      const semAtual = prev.filter((a) => a.id !== nova.id).concat(nova);
      return [...semAtual, nova];
    });
  };

  const buscarAvaliacao = (id: number) => {
    return avaliacoes.find((a) => a.id === id);
  };

  const getStatus = (id: number): "pendente" | "andamento" | "avaliado" => {
    const avaliacao = buscarAvaliacao(id);
    if (!avaliacao) return "pendente";
    return avaliacao.status;
  };

  return { avaliacoes, salvarAvaliacao, buscarAvaliacao, getStatus };
}
