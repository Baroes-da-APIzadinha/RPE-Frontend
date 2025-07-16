import { useCallback, useEffect, useState } from 'react';
import { getCiclos } from '@/services/HTTP/ciclos';

// export function useCiclos() {
//   const [cicloAtivo, setCicloAtivo] = useState<any>(null);
//   const [historico, setHistorico] = useState<any[]>([]);

//   useEffect(() => {
//     console.log('useCiclos montou');

//     async function fetchCiclos() {
//       try {

//         const ciclos = await getCiclos(); 
//         console.log('Ciclos vindos da API:', ciclos);

//         const cicloEmAndamento = ciclos.find((c: any) => c.status === 'EM_ANDAMENTO');

//         if (cicloEmAndamento) {
//           setCicloAtivo({ ...cicloEmAndamento, destaqueTitulo: 'Ciclo Atual' });
//           const restante = ciclos.filter((c: any) => c.idCiclo !== cicloEmAndamento.idCiclo);
//           setHistorico(restante);
//           return;
//         }

//         const agendadoMaisProximo = ciclos
//           .filter((c: any) => c.status === 'AGENDADO')
//           .sort((a: any, b: any) => new Date(a.dataInicio).getTime() - new Date(b.dataInicio).getTime())[0];

//         if (agendadoMaisProximo) {
//           setCicloAtivo({ ...agendadoMaisProximo, destaqueTitulo: 'Próximo Ciclo' });
//           const restante = ciclos.filter((c: any) => c.idCiclo !== agendadoMaisProximo.idCiclo);
//           setHistorico(restante);
//           return;
//         }

//         setHistorico(ciclos);
//       } catch (err) {
//         console.error('Erro ao buscar ciclos', err);
//       }
//     }

//     fetchCiclos();
//   }, []);

//   return { cicloAtivo, historico };
// }

export function useCiclos() {
  const [cicloAtivo, setCicloAtivo] = useState<any>(null);
  const [historico, setHistorico] = useState<any[]>([]);

  const refetch = useCallback(async () => {
    try {
      const ciclos = await getCiclos();
      console.log('Ciclos vindos da API:', ciclos);

        const cicloEmAndamento = ciclos.find((c: any) => c.status === 'EM_ANDAMENTO');

        if (cicloEmAndamento) {
          setCicloAtivo({ ...cicloEmAndamento, destaqueTitulo: 'Ciclo Atual' });
          const restante = ciclos.filter((c: any) => c.idCiclo !== cicloEmAndamento.idCiclo);
          setHistorico(restante);
          return;
        }

        const agendadoMaisProximo = ciclos
          .filter((c: any) => c.status === 'AGENDADO')
          .sort((a: any, b: any) => new Date(a.dataInicio).getTime() - new Date(b.dataInicio).getTime())[0];

        if (agendadoMaisProximo) {
          setCicloAtivo({ ...agendadoMaisProximo, destaqueTitulo: 'Próximo Ciclo' });
          const restante = ciclos.filter((c: any) => c.idCiclo !== agendadoMaisProximo.idCiclo);
          setHistorico(restante);
          return;
        }

        setHistorico(ciclos);

    } catch (err) {
      console.error('Erro ao buscar ciclos', err);
    }
  }, []);

  useEffect(() => {
    refetch(); 
  }, [refetch]);

  return { cicloAtivo, historico, refetch }; 
}

export function useTodosCiclos() {
  const [ciclos, setCiclos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCiclos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedCiclos = await getCiclos();
      setCiclos(fetchedCiclos);
    } catch (err) {
      console.error('Erro ao buscar ciclos:', err);
      setError(err instanceof Error ? err.message : 'Erro ao buscar ciclos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCiclos();
  }, [fetchCiclos]);

  return { ciclos, loading, error, refetch: fetchCiclos };
}

