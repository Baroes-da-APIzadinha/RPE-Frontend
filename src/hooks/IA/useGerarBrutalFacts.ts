import { useState } from "react";
import { gerarBrutalFacts } from "@/services/HTTP/IA";

export function useGerarBrutalFacts() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateBrutalFacts = async (idColaborador: string, idCiclo: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await gerarBrutalFacts(idColaborador, idCiclo);
      return response;
    } catch (err) {
      console.error("Erro ao gerar brutal facts:", err);
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { generateBrutalFacts, loading, error };
}
