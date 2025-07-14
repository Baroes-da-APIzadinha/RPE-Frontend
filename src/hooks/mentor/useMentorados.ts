import { useEffect, useState } from "react";
import { getMentorados } from "@/services/HTTP/mentor";

export interface Mentorado {
  idMentorado: string;
  nomeMentorado: string;
  cargoMentorado: string;
  trilhaMentorado: string;
  mediaFinal: number | null;
}

export function useMentorados(idMentor: string, idCiclo: string) {
  const [data, setData] = useState<Mentorado[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idMentor || !idCiclo) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchMentorados = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await getMentorados(idMentor, idCiclo);
        setData(response);
      } catch (err) {
        console.error("Erro ao buscar mentorados:", err);
        setError(err instanceof Error ? err.message : "Erro desconhecido");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorados();
  }, [idMentor, idCiclo]);

  return { data, loading, error };
}
