import { useState, useEffect } from 'react';
import { getEqualizacaoColaborador } from '@/services/HTTP/comite';

export interface EqualizacaoAlvo {
  nomeCompleto: string;
  cargo: string;
}

export interface EqualizacaoColaborador {
  idEqualizacao: string;
  idCiclo: string;
  idAvaliado: string;
  idMembroComite: string | null;
  notaAjustada: number;
  justificativa: string;
  status: string;
  dataEqualizacao: string;
  alvo: EqualizacaoAlvo;
}

export function useEqualizacaoColaborador(idColaborador: string, idCiclo: string) {
  const [data, setData] = useState<EqualizacaoColaborador[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!idColaborador || !idCiclo) return;

      try {
        setLoading(true);
        setError(null);
        
        const response = await getEqualizacaoColaborador(idColaborador, idCiclo);
        
        // Trata os valores nulos, definindo nota = 0 e justificativa = ""
        const processedData = response.map((equalizacao: any) => ({
          ...equalizacao,
          notaAjustada: equalizacao.notaAjustada ?? 0,
          justificativa: equalizacao.justificativa ?? "",
        }));
        
        setData(processedData);
      } catch (err) {
        console.error('Erro ao buscar equalização do colaborador:', err);
        setError('Erro ao carregar equalização do colaborador');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idColaborador, idCiclo]);

  const refetch = async () => {
    if (!idColaborador || !idCiclo) return;

    try {
      setLoading(true);
      setError(null);
      
      const response = await getEqualizacaoColaborador(idColaborador, idCiclo);
      
      // Trata os valores nulos, definindo nota = 0 e justificativa = ""
      const processedData = response.map((equalizacao: any) => ({
        ...equalizacao,
        notaAjustada: equalizacao.notaAjustada ?? 0,
        justificativa: equalizacao.justificativa ?? "",
      }));
      
      setData(processedData);
    } catch (err) {
      console.error('Erro ao buscar equalização do colaborador:', err);
      setError('Erro ao carregar equalização do colaborador');
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    refetch
  };
}
