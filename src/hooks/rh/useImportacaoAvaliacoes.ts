import { useState } from 'react';
import { importarAvaliacoes } from '@/services/HTTP/rh';

interface UseImportacaoAvaliacoesReturn {
  importAvaliacoes: (file: File) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export function useImportacaoAvaliacoes(): UseImportacaoAvaliacoesReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const importAvaliacoes = async (file: File) => {
    if (!file) {
      setError('Arquivo é obrigatório');
      return;
    }

    // Validar tipo de arquivo
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-excel', // .xls
      'text/csv', // .csv
    ];

    if (!allowedTypes.includes(file.type)) {
      setError('Tipo de arquivo não suportado. Use arquivos .xlsx, .xls ou .csv');
      return;
    }

    // Validar tamanho do arquivo (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('Arquivo muito grande. Tamanho máximo: 10MB');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await importarAvaliacoes(file);
      setSuccess(true);
      console.log('Importação iniciada com sucesso:', response.data);
    } catch (err: any) {
      console.error('Erro ao importar avaliações:', err);
      
      if (err.response?.status === 400) {
        setError('Arquivo inválido ou formato incorreto');
      } else if (err.response?.status === 413) {
        setError('Arquivo muito grande');
      } else {
        setError(err.response?.data?.message || 'Erro ao importar avaliações');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    importAvaliacoes,
    loading,
    error,
    success,
  };
}
