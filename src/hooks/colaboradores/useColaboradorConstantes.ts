import { useEffect, useState } from "react";
import { getColaboradorConstantes } from "@/services/HTTP/colaboradores";

type Constantes = {
  trilhas: string[];
  cargos: string[];
  unidades: string[];
};

export function useColaboradorConstantes() {
  const [data, setData] = useState<Constantes | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getColaboradorConstantes()
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  }, []);

  return { constantes: data, loading };
}
