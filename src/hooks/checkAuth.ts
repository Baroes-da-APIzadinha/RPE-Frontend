import api from '@/services/axios';
export const checkAuth = async () => {
  try {
    const res = await api.get('/auth/me');
    return res.data; // usuário autenticado
  } catch {
    return null; // não autenticado
  }
};
