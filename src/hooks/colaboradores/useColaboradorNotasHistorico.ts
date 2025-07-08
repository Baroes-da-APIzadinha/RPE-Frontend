import { useEffect, useState } from 'react';
import { getNotasHistorico } from '@/services/HTTP/colaboradores';

interface NotaHistorico {
    id: string;
  cicloNome: string;
  cicloNota: number; // Permite que cicloNota seja null
}

export function useColaboradorNotasHistorico(id: string): { notasHistorico: NotaHistorico[] } {
  const [notasHistorico, setNotasHistorico] = useState<NotaHistorico[]>([]);

  useEffect(() => {
    async function fetchNotasHistorico() {
      try {
        const response = await getNotasHistorico(id);
        console.log("Notas do histórico:", response);
        const processedResponse = response.map((nota: NotaHistorico) => ({
          ...nota,
          cicloNota: nota.cicloNota === null ? 0 : nota.cicloNota,
        }));
        setNotasHistorico(processedResponse);
      } catch (err) {
        console.error(err);
      } finally {
        console.log("Notas do histórico carregadas:", notasHistorico);
      }
    }

    if (id) {
      fetchNotasHistorico();
    }
  }, [id]);

  return { notasHistorico };
}