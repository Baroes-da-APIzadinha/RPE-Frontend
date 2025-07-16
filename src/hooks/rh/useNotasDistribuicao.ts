import { useState, useEffect } from 'react';
import { getNotasDistribuicao } from '@/services/HTTP/avaliacoes';

interface NotasDistribuicaoData {
  [key: string]: number;
}

export function useNotasDistribuicao(idCiclo: string, tipoAvaliacao: string = 'AUTOAVALIACAO') {
  const [data, setData] = useState<NotasDistribuicaoData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!idCiclo) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        const response = await getNotasDistribuicao(idCiclo, tipoAvaliacao);
        setData(response);
      } catch (err) {
        console.error('Erro ao buscar distribuição de notas:', err);
        setError(err instanceof Error ? err.message : 'Erro ao buscar dados');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idCiclo, tipoAvaliacao]);

  return { data, loading, error };
}
