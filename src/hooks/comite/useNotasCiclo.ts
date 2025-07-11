import { useState, useEffect } from 'react';
import { getNotasCiclo } from '@/services/HTTP/comite';

export interface NotasColaborador {
  notaAuto: number;
  nota360media: number;
  notaGestor: number;
  discrepancia: number;
}

export interface ColaboradorNotas {
  idColaborador: string;
  nomeColaborador: string;
  cargoColaborador: string;
  trilhaColaborador: string;
  equipeColaborador: string;
  notas: NotasColaborador;
}

export function useNotasCiclo(idCiclo: string) {
  const [data, setData] = useState<ColaboradorNotas[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!idCiclo) return;

      try {
        setLoading(true);
        setError(null);
        
        const response = await getNotasCiclo(idCiclo);
        
        // Trata os valores nulos das notas, definindo como 0
        const processedData = response.map((colaborador: any) => ({
          ...colaborador,
          notas: {
            notaAuto: colaborador.notas.notaAuto ?? 0,
            nota360media: colaborador.notas.nota360media ?? 0,
            notaGestor: colaborador.notas.notaGestor ?? 0,
            discrepancia: colaborador.notas.discrepancia ?? 0,
          }
        }));
        
        setData(processedData);
      } catch (err) {
        console.error('Erro ao buscar notas do ciclo:', err);
        setError('Erro ao carregar notas do ciclo');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idCiclo]);

  const refetch = async () => {
    if (!idCiclo) return;

    try {
      setLoading(true);
      setError(null);
      
      const response = await getNotasCiclo(idCiclo);
      
      // Trata os valores nulos das notas, definindo como 0
      const processedData = response.map((colaborador: any) => ({
        ...colaborador,
        notas: {
          notaAuto: colaborador.notas.notaAuto ?? 0,
          nota360media: colaborador.notas.nota360media ?? 0,
          notaGestor: colaborador.notas.notaGestor ?? 0,
          discrepancia: colaborador.notas.discrepancia ?? 0,
        }
      }));
      
      setData(processedData);
    } catch (err) {
      console.error('Erro ao buscar notas do ciclo:', err);
      setError('Erro ao carregar notas do ciclo');
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    refetch
  };
}
