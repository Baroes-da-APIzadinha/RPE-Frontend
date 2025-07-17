import { useState, useEffect } from 'react';
import { listarReferenciasPorIndicado } from '@/services/HTTP/referencias';

export interface Ciclo {
  idCiclo: string;
  nomeCiclo: string;
  dataInicio: string;
  dataFim: string;
  status: string;
  updatedAt: string;
  duracaoEmAndamentoDias: number;
  duracaoEmRevisaoDias: number;
  duracaoEmEqualizacaoDias: number;
}

export interface Indicador {
  idColaborador: string;
  nomeCompleto: string;
  email: string;
  senha: string;
  cargo: string;
  trilhaCarreira: string;
  unidade: string;
  dataCriacao: string;
  primeiroLogin: boolean;
}

export interface Referencia {
  idIndicacao: string;
  idCiclo: string;
  idIndicador: string;
  idIndicado: string;
  tipo: 'TECNICA' | 'CULTURAL';
  justificativa: string;
  ciclo: Ciclo;
  indicador: Indicador;
}

export interface UseReferenciasPorIndicadoReturn {
  referencias: Referencia[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useReferenciasPorIndicado(idIndicado: string): UseReferenciasPorIndicadoReturn {
  const [referencias, setReferencias] = useState<Referencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReferencias = async () => {
    if (!idIndicado) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await listarReferenciasPorIndicado(idIndicado);
      setReferencias(response || []);
    } catch (err) {
      console.error('Erro ao buscar referências por indicado:', err);
      setError('Erro ao carregar referências');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferencias();
  }, [idIndicado]);

  const refetch = async () => {
    await fetchReferencias();
  };

  return {
    referencias,
    loading,
    error,
    refetch
  };
}
