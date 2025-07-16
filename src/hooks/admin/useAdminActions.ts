import { useState, useCallback } from 'react';
import { forceERPSync, changeStatus } from '@/services/HTTP/admin';

interface UseAdminActionsReturn {
  loading: boolean;
  error: string | null;
  forceSync: () => Promise<void>;
  changeCycleStatus: (idCiclo: string, currentStatus: string) => Promise<void>;
  changeStatusAdvanced: (idCiclo: string, currentStatus: string, nextStatus: string) => Promise<void>;
}

export function useAdminActions(): UseAdminActionsReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const forceSync = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await forceERPSync();
    } catch (err) {
      console.error('Erro ao forçar sincronização com ERP:', err);
      setError(err instanceof Error ? err.message : 'Erro ao forçar sincronização com ERP');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const changeCycleStatus = useCallback(async (idCiclo: string, currentStatus: string) => {
    if (!idCiclo || !currentStatus) {
      setError('ID do ciclo e status atual são obrigatórios');
      return;
    }

    // Definir sequência de status
    const statusSequence = [
      'AGENDADO',
      'EM_ANDAMENTO', 
      'EM_REVISAO',
      'EM_EQUALIZAÇÃO',
      'FECHADO'
    ];

    const currentIndex = statusSequence.indexOf(currentStatus);
    
    if (currentIndex === -1) {
      setError('Status atual inválido');
      return;
    }

    if (currentIndex === statusSequence.length - 1) {
      setError('O ciclo já está no status final (FECHADO)');
      return;
    }

    const nextStatus = statusSequence[currentIndex + 1];

    setLoading(true);
    setError(null);

    try {
      await changeStatus(idCiclo, currentStatus, nextStatus);
    } catch (err) {
      console.error('Erro ao alterar status do ciclo:', err);
      setError(err instanceof Error ? err.message : 'Erro ao alterar status do ciclo');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const changeStatusAdvanced = useCallback(async (idCiclo: string, currentStatus: string, nextStatus: string) => {
    if (!idCiclo || !currentStatus || !nextStatus) {
      setError('ID do ciclo, status atual e próximo status são obrigatórios');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await changeStatus(idCiclo, currentStatus, nextStatus);
    } catch (err) {
      console.error('Erro ao alterar status do ciclo:', err);
      setError(err instanceof Error ? err.message : 'Erro ao alterar status do ciclo');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    forceSync,
    changeCycleStatus,
    changeStatusAdvanced,
  };
}
