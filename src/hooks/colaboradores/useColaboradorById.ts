import { useEffect, useState } from "react";
import { getColaboradorById } from "@/services/HTTP/colaboradores";
import type { Colaborador } from "@/types/Colaborador";

export function useColaboradorById(id: string) {
  const [colaborador, setColaborador] = useState<Colaborador | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getColaboradorById(id)
      .then((res) => setColaborador(res.data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [id]);

  return { colaborador, loading, error };
}
