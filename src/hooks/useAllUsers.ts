import { useState, useEffect } from 'react';
import { getAllUsers } from '@/services/HTTP/colaboradores';

export interface User {
  idColaborador: string;
  nome: string;
  cargos: string[];
  email: string;
  trilha: string;
  unidade: string;
}

export function useAllUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getAllUsers();
      console.log('Response completo:', response);

     const usersData = response?.users;
      if (!Array.isArray(usersData)) {
        throw new Error('Formato inesperado na resposta da API');
      }

      console.log('Users extraídos:', usersData);
      setUsers(usersData);
    } catch (err) {
      console.error('Erro ao buscar usuários:', err);
      setError('Erro ao buscar usuários');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return {
    users,
    loading,
    error,
    refetch: fetchAllUsers
  };
}
