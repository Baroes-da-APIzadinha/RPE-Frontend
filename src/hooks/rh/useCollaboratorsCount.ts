import { useEffect, useState } from 'react';
import { getCollaboratorsCount } from '@/services/HTTP/rh';

export function useCollaboratorsCount(idCiclo: string) {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    getCollaboratorsCount(idCiclo)
      .then((res) => {
        if (isMounted) {
          setCount(res?.TotalColaboradores || 0);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err?.message || 'Erro ao buscar colaboradores');
          setLoading(false);
        }
      });
    return () => { isMounted = false; };
  }, [idCiclo]);

  return { count, loading, error };
}
