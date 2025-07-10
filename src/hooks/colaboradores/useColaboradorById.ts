import { useEffect, useState } from "react";
import { getColaboradorById } from "@/services/HTTP/colaboradores";
import type { Colaborador } from "@/types/Colaborador";

export function useColaboradorById(id: string) {
  const [colaborador, setColaborador] = useState<Colaborador | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
  if (!id) {
    console.warn("ID inválido para busca de colaborador:", id);
    setLoading(false);
    return;
  }

  setLoading(true);
  getColaboradorById(id)
    .then((res) => {
      setColaborador(res);
    })
    .catch((err) => {
      console.error("Erro ao buscar colaborador por ID:", err);
      setError(err);
    })
    .finally(() => setLoading(false));
}, [id]);



  return { colaborador, loading, error };
}
