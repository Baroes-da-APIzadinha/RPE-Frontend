import { useState, useEffect } from 'react';
import { getAvaliações } from '@/services/HTTP/IA';

interface CardAvaliacao {
  idCardAvaliacao: string;
  idAvaliacao: string;
  nomeCriterio: string;
  nota: string;
  justificativa: string;
}

interface AutoAvaliacao {
  idAvaliacao: string;
  notaFinal: string;
  cardAutoAvaliacoes: CardAvaliacao[];
}

interface AvaliacaoPares {
  idAvaliacao: string;
  nota: string;
  motivadoTrabalharNovamente: string;
  pontosFortes: string;
  pontosFracos: string;
}

interface AvaliacaoLiderColaborador {
  idAvaliacao: string;
  notaFinal: string;
  cardAvaliacaoLiderColaborador: CardAvaliacao[];
}

interface Avaliacao {
  idAvaliacao: string;
  idCiclo: string;
  idAvaliador: string;
  idAvaliado: string;
  status: string;
  tipoAvaliacao: string;
  autoAvaliacao: AutoAvaliacao | null;
  avaliacaoPares: AvaliacaoPares | null;
  avaliacaoLiderColaborador: AvaliacaoLiderColaborador | null;
}

interface UseGetAvaliacoesReturn {
  data: Avaliacao[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useGetAvaliacoes(idColaborador: string, idCiclo: string): UseGetAvaliacoesReturn {
  const [data, setData] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchAvaliacoes = async () => {
    if (!idColaborador || !idCiclo) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await getAvaliações(idColaborador, idCiclo);
      
      // A API retorna os dados diretamente como array, não dentro de um objeto response
      if (Array.isArray(response)) {
        setData(response);
      } else {
        // Se for um objeto response, usar response.data
        setData(response.data || []);
      }
    } catch (err) {
      console.error('Erro ao buscar avaliações:', err);
      setError('Erro ao carregar avaliações');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchAvaliacoes();
  };

  useEffect(() => {
    fetchAvaliacoes();
  }, [idColaborador, idCiclo]);

  return {
    data,
    loading,
    error,
    refetch
  };
}
