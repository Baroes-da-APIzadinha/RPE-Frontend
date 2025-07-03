import { useEffect, useState } from 'react';
import { getUnits } from '@/services/HTTP/rh';

export function useUnidadesCount() {
  const [unitCount, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    getUnits()
      .then((res) => {
        if (isMounted) {
          setCount(res?.quantidadeUnidades ?? null);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err?.message || 'Erro ao buscar unidades');
          setLoading(false);
        }
      });
    return () => { isMounted = false; };
  }, []);

  return { unitCount, loading, error };
}
