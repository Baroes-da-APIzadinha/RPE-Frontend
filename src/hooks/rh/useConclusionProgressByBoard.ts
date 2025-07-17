import { useEffect, useState } from "react";
import { getConclusionProgressByBoard } from "@/services/HTTP/rh";

export interface BoardProgress {
  nomeTrilha: string;
  quantConcluidas: number;
  total: number;
}

export function useConclusionProgressByBoard(idCiclo: string) {
  const [data, setData] = useState<BoardProgress[]>([]);

  useEffect(() => {
    if (!idCiclo) {
      setData([]);
      return;
    }
    getConclusionProgressByBoard(idCiclo)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.error("Erro ao buscar progresso de conclusão por trilha:", err);
        setData([]);
      });
  }, [idCiclo]);

  return { data };
}
