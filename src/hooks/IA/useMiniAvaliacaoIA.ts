import { useState, useEffect } from 'react';
import { getMiniAvaliarColaborador } from '@/services/HTTP/IA';

export interface MiniAvaliacaoIA {
  notaFinalSugerida: number;
  justificativa: string;
  textoCompleto: string;
}

export function useMiniAvaliacaoIA(idColaborador: string, idCiclo: string) {
  const [data, setData] = useState<MiniAvaliacaoIA | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!idColaborador || !idCiclo) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await getMiniAvaliarColaborador(idColaborador, idCiclo);
        
        // Processa o texto da resposta para extrair a nota e justificativa
        const textoCompleto = response || '';
        
        // Extrai a nota final sugerida usando regex
        const notaMatch = textoCompleto.match(/\*\*Nota Final Sugerida:\*\*\s*(\d+\.?\d*)/);
        const notaFinalSugerida = notaMatch ? parseFloat(notaMatch[1]) : 0;
        
        // Extrai a justificativa usando regex
        const justificativaMatch = textoCompleto.match(/\*\*Justificativa:\*\*\s*(.*?)(?=\n\n|\n\*\*|$)/s);
        const justificativa = justificativaMatch ? justificativaMatch[1].trim() : '';
        
        setData({
          notaFinalSugerida,
          justificativa,
          textoCompleto
        });
      } catch (err) {
        console.error('Erro ao buscar mini avaliação da IA:', err);
        setError('Erro ao carregar avaliação da IA');
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
      
      const response = await getMiniAvaliarColaborador(idColaborador, idCiclo);
      
      const textoCompleto = response || '';
      
      const notaMatch = textoCompleto.match(/\*\*Nota Final Sugerida:\*\*\s*(\d+\.?\d*)/);
      const notaFinalSugerida = notaMatch ? parseFloat(notaMatch[1]) : 0;
      
      const justificativaMatch = textoCompleto.match(/\*\*Justificativa:\*\*\s*(.*?)(?=\n\n|\n\*\*|$)/s);
      const justificativa = justificativaMatch ? justificativaMatch[1].trim() : '';
      
      setData({
        notaFinalSugerida,
        justificativa,
        textoCompleto
      });
    } catch (err) {
      console.error('Erro ao buscar mini avaliação da IA:', err);
      setError('Erro ao carregar avaliação da IA');
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
