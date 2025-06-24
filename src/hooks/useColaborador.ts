import { useMemo } from 'react';
import { mockColaboradores } from '@/data/colaboradores360';

export function useColaborador(id?: string) {
  return useMemo(() => {
    if (!id) return null;
    return mockColaboradores.find((colab) => colab.id === Number(id)) ?? null;
  }, [id]);
}
