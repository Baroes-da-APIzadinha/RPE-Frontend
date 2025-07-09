import { useEffect, useState } from "react";
import { getCountAvaliacoesByColaborador } from "@/services/HTTP/colaboradores";

export function useCountAvaliacoes(id: string): {
  countAvaliacoes: string | "0";
  loading: boolean;
  error: string | null;
} {
  const [countAvaliacoes, setcountAvaliacoes] = useState<string>("0");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCountAvaliacoes() {
      try {
        setLoading(true);
        const response = await getCountAvaliacoesByColaborador(id);
        setcountAvaliacoes((response.quantidadeAvaliacoes));
      } catch (err) {
        console.error("Erro ao buscar quantidade de avaliações:", err);
        setError("Erro ao buscar quantidade de avaliações.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchCountAvaliacoes();
    }
  }, [id]);

  return { countAvaliacoes, loading, error };
}
