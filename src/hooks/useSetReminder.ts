import { useState } from "react";
import { createReminder } from "@/services/HTTP/reminder";

interface UseSetReminderReturn {
  setReminder: (message: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export function useSetReminder(): UseSetReminderReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const setReminder = async (message: string) => {
    if (!message.trim()) {
      setError("Mensagem do lembrete é obrigatória");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await createReminder(message);
      setSuccess(true);
    } catch (err) {
      console.error("Erro ao criar lembrete:", err);
      setError(err instanceof Error ? err.message : "Erro ao criar lembrete");
    } finally {
      setLoading(false);
    }
  };

  return {
    setReminder,
    loading,
    error,
    success,
  };
}
