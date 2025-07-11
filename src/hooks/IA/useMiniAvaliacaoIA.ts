import { useState, useEffect } from 'react';
import { getMiniAvaliarColaborador } from '@/services/HTTP/IA';

export interface MiniAvaliacaoIA {
  notaFinalSugerida: number;
  justificativa: string;
  textoCompleto: string;
}

const CACHE_KEY = 'miniAvaliacaoIA_cache';

export function useMiniAvaliacaoIA(idColaborador: string, idCiclo: string) {
  const [data, setData] = useState<MiniAvaliacaoIA | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para gerar chave única do cache
  const getCacheKey = (idColaborador: string, idCiclo: string) => {
    return `${CACHE_KEY}_${idColaborador}_${idCiclo}`;
  };

  // Função para buscar dados do cache
  const getFromCache = (key: string): MiniAvaliacaoIA | null => {
    try {
      const cached = localStorage.getItem(key);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  };

  // Função para salvar dados no cache
  const saveToCache = (key: string, data: MiniAvaliacaoIA) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.warn('Erro ao salvar no cache:', error);
    }
  };

  // Função para processar texto da API
  const processApiResponse = (textoCompleto: string): MiniAvaliacaoIA => {
    // Extrai a nota final sugerida usando regex
    const notaMatch = textoCompleto.match(/\*\*Nota Final Sugerida:\*\*\s*(\d+\.?\d*)/);
    const notaFinalSugerida = notaMatch ? parseFloat(notaMatch[1]) : 0;
    
    // Extrai a justificativa usando regex
    const justificativaMatch = textoCompleto.match(/\*\*Justificativa:\*\*\s*(.*?)(?=\n\n|\n\*\*|$)/s);
    const justificativa = justificativaMatch ? justificativaMatch[1].trim() : '';
    
    return {
      notaFinalSugerida,
      justificativa,
      textoCompleto
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!idColaborador || !idCiclo) {
        setLoading(false);
        return;
      }

      const cacheKey = getCacheKey(idColaborador, idCiclo);
      
      // Verifica se existe no cache
      const cachedData = getFromCache(cacheKey);
      if (cachedData) {
        setData(cachedData);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await getMiniAvaliarColaborador(idColaborador, idCiclo);
        const textoCompleto = response || '';
        
        const processedData = processApiResponse(textoCompleto);
        
        // Salva no cache
        saveToCache(cacheKey, processedData);
        
        setData(processedData);
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
      
      const processedData = processApiResponse(textoCompleto);
      
      // Atualiza o cache
      const cacheKey = getCacheKey(idColaborador, idCiclo);
      saveToCache(cacheKey, processedData);
      
      setData(processedData);
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

// Função para limpar cache (exportada para ser usada em outros componentes)
export function clearMiniAvaliacaoIACache() {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(CACHE_KEY)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.warn('Erro ao limpar cache:', error);
  }
}
