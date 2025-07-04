import { useEffect, useState } from 'react';
import { getAvaliationsStatusPerCycle } from '@/services/HTTP/rh';

export function useEvaluationStatusCount(idCiclo: string) {
  const [quantConcluidas, setQuantConcluidas] = useState(0);
  const [quantPendentes, setQuantPendentes] = useState(0);
  const [quantEmAndamento, setQuantEmAndamento] = useState(0);

  useEffect(() => {
    let isMounted = true;
    getAvaliationsStatusPerCycle(idCiclo)
      .then((res) => {
        if (isMounted) {
          setQuantConcluidas(res?.quantConcluidas ?? 0);
          setQuantPendentes(res?.quantPendentes ?? 0);
          setQuantEmAndamento(res?.quantEmAndamento ?? 0);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error(err?.message || 'Erro ao buscar status das avaliações');
        }
      });
    return () => { isMounted = false; };
  }, [idCiclo]);

  return { quantConcluidas, quantPendentes, quantEmAndamento };
}
