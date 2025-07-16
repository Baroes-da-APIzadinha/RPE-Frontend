import { useState } from 'react';
import { getExportacaoTemplate } from '@/services/HTTP/rh';

interface UseExportacaoTemplateReturn {
  downloadTemplate: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useExportacaoTemplate(): UseExportacaoTemplateReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadTemplate = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getExportacaoTemplate();

      if (response && response.data instanceof Blob) {
        const url = window.URL.createObjectURL(response.data);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'template_importacao.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        throw new Error('A resposta não é um arquivo válido para download');
      }
    } catch (err) {
      console.error('Erro ao fazer download do template:', err);
      setError(err instanceof Error ? err.message : 'Erro ao fazer download do template');
    } finally {
      setLoading(false);
    }
  };

  return {
    downloadTemplate,
    loading,
    error,
  };
}
