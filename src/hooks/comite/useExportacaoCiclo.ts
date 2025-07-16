import { useState } from 'react';
import { getExportacaoCiclo } from '@/services/HTTP/comite';

interface UseEqualizacaoCicloReturn {
  downloadCycleData: (idCiclo: string, nomeCiclo: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useEqualizacaoCiclo(): UseEqualizacaoCicloReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadCycleData = async (idCiclo: string, nomeCiclo : string) => {
    if (!idCiclo) {
      setError('ID do ciclo é obrigatório');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await getExportacaoCiclo(idCiclo);

        if (response && response.data instanceof Blob) {
            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            link.download = `relatorio_ciclo_${nomeCiclo}.xlsx`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } else {
            throw new Error('A resposta não é um arquivo válido para download');
        }

    } catch (err) {
      console.error('Erro ao fazer download do relatório:', err);
      setError(err instanceof Error ? err.message : 'Erro ao fazer download do relatório');
    } finally {
      setLoading(false);
    }
  };

  return {
    downloadCycleData,
    loading,
    error,
  };
}
