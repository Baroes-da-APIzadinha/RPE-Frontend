import { useEffect, useState } from "react";
import { getConclusionProgressByUnit } from "@/services/HTTP/rh";

export interface UnitProgress {
  nomeUnidade: string;
  quantConcluidas: number;
  total: number;
}

export function useConclusionProgressByUnit(idCiclo: string) {
  const [data, setData] = useState<UnitProgress[]>([]);

  useEffect(() => {
    if (!idCiclo) {
      setData([]);
      return;
    }
    getConclusionProgressByUnit(idCiclo)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.error("Erro ao buscar progresso de conclusão por unidade:", err);
        setData([]);
      });
  }, [idCiclo]);

  return { data };
}
