import { useState, useEffect } from "react";
import { getReminder } from "@/services/HTTP/reminder";

interface ReminderData {
  message: string | null;
  hasReminder: boolean;
}

interface UseGetReminderReturn {
  data: ReminderData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useGetReminder(): UseGetReminderReturn {
  const [data, setData] = useState<ReminderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReminder = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getReminder();
      setData(response);
    } catch (err) {
      console.error("Erro ao buscar lembrete:", err);
      setError(err instanceof Error ? err.message : "Erro ao buscar lembrete");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchReminder();
  };

  useEffect(() => {
    fetchReminder();
  }, []);

  return {
    data,
    loading,
    error,
    refetch,
  };
}
