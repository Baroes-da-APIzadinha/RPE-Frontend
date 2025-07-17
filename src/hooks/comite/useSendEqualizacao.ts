import { useState, useCallback } from 'react';
import { sendEqualizacao } from '@/services/HTTP/comite';
import type { SendEqualizacaoParams } from '@/types/equalizacao';

export function useSendEqualizacao() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sendEqualizacaoData = useCallback(async (params: SendEqualizacaoParams) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await sendEqualizacao(
        params.idEqualizacao,
        params.notaAjustada.toString(),
        params.justificativa,
        params.status
      );

      setSuccess(true);
      return response;
    } catch (err) {
      console.error('Erro ao enviar equalização:', err);
      setError('Erro ao enviar equalização');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
    setLoading(false);
  }, []);

  return {
    sendEqualizacaoData,
    loading,
    error,
    success,
    reset
  };
}
