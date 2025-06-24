import { useState, useEffect } from "react";
import { getCicloAtivos } from "@/services/HTTP/ciclos";

type Ciclo = {
  nome: string;
  tempoRestante: string;
  [key: string]: any;
};

function treatTimeRemaining(timeRemaning: string) {
  const [dayPart, hourPart, minutePart] = timeRemaning.split(", ");

  const days = parseInt(dayPart.split(" ")[0], 10);
  const hours = parseInt(hourPart.split(" ")[0], 10);
  const minutes = parseInt(minutePart.split(" ")[0], 10);

  if (days > 0) {
    return `${days} dias restantes`;
  } else if (hours > 0) {
    return `${hours} horas restantes`;
  } else {
    return `${minutes} minutos restantes`;
  }
}

export function useCicloAtual() {
  const [cicloAtual, setCicloAtual] = useState<Ciclo | null>(null);

  useEffect(() => {
    const fetchCicloAtivos = async () => {
      try {
        const ciclo = await getCicloAtivos();
        setCicloAtual(ciclo[0]);
      } catch (error) {
        console.error("Error fetching ciclo ativos:", error);
      }
    };

    fetchCicloAtivos();
  }, []);

  return {
    cicloAtual,
    treatTimeRemaining,
  };
}
