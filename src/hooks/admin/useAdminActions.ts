import { useState, useCallback } from 'react';
import { forceERPSync, updateCycleStatus } from '@/services/HTTP/admin';

interface UseAdminActionsReturn {
  loading: boolean;
  error: string | null;
  forceSync: () => Promise<void>;
  changeCycleStatus: (idCiclo: string, status: string) => Promise<void>;
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

  const changeCycleStatus = useCallback(async (idCiclo: string, status: string) => {
    if (!idCiclo || !status) {
      setError('ID do ciclo e status são obrigatórios');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await updateCycleStatus(idCiclo, status);
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
  };
}
