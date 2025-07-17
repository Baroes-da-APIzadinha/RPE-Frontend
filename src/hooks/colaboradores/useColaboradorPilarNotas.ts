import { useEffect, useState } from "react";
import { getColaboradorPilarNotas } from "@/services/HTTP/colaboradores";
import type { CicloPilarNotas } from "@/types/PilarNota";

export function useColaboradorPilarNotas(id: string): {
  pilarNotas: CicloPilarNotas[];
  loading: boolean;
  error: string | null;
} {
  const [pilarNotas, setPilarNotas] = useState<CicloPilarNotas[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPilarNotas() {
      try {
        setLoading(true);
        const response = await getColaboradorPilarNotas(id);
        const formattedResponse = response.map((cicloData: any) => ({
          ciclo: cicloData.ciclo,
          notas: cicloData.notas.map((nota: any) => ({
            pilarNome: nota.pilarNome,
            pilarNota: nota.pilarNota,
          })),
        }));
        setPilarNotas(formattedResponse);
      } catch (err) {
        console.error("Erro ao buscar notas dos pilares:", err);
        setError("Erro ao buscar notas dos pilares.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchPilarNotas();
    }
  }, [id]);

  return { pilarNotas, loading, error };
}
