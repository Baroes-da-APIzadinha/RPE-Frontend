import { useState, useCallback } from 'react';
import { createCollaboratorReminder, getCollaboratorReminder } from '@/services/HTTP/reminder';

interface CollaboratorReminderData {
  message: string | null;
  hasReminder: boolean;
  idColaborador: string;
}

interface UseCollaboratorReminderReturn {
  reminderData: CollaboratorReminderData | null;
  loading: boolean;
  error: string | null;
  createReminder: (idColaborador: string, message: string, ttlSeconds?: number) => Promise<void>;
  getReminder: (idColaborador: string) => Promise<void>;
}

export function useCollaboratorReminder(): UseCollaboratorReminderReturn {
  const [reminderData, setReminderData] = useState<CollaboratorReminderData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createReminder = useCallback(async (idColaborador: string, message: string, ttlSeconds?: number) => {
    if (!idColaborador || !message) {
      setError('ID do colaborador e mensagem são obrigatórios');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createCollaboratorReminder(idColaborador, message, ttlSeconds);
    } catch (err) {
      console.error('Erro ao criar lembrete do colaborador:', err);
      setError(err instanceof Error ? err.message : 'Erro ao criar lembrete do colaborador');
    } finally {
      setLoading(false);
    }
  }, []);

  const getReminder = useCallback(async (idColaborador: string) => {
    if (!idColaborador) {
      setError('ID do colaborador é obrigatório');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await getCollaboratorReminder(idColaborador);
      setReminderData(response);
    } catch (err) {
      console.error('Erro ao buscar lembrete do colaborador:', err);
      setError(err instanceof Error ? err.message : 'Erro ao buscar lembrete do colaborador');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    reminderData,
    loading,
    error,
    createReminder,
    getReminder,
  };
}