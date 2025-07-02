// hooks/useListColaboradores.ts

import { getListColaboradores } from '@/services/HTTP/colaboradores';
import { useEffect, useState } from 'react';

export function useListColaboradores() {
  const [colaboradores, setColaboradores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchColaboradores() {
    setLoading(true);
    setError(null);

    try {
      const data = await getListColaboradores();
      setColaboradores(data || []);
    } catch (err: any) {
      setError(err?.message || 'Erro ao buscar colaboradores');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchColaboradores();
  }, []);

  return { colaboradores, loading, error, refetch: fetchColaboradores };
}
