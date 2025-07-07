import { useEffect, useState } from 'react';
import { getCiclos } from '@/services/HTTP/ciclos';

export function useCiclos() {
  const [cicloAtivo, setCicloAtivo] = useState<any>(null);
  const [historico, setHistorico] = useState<any[]>([]);

  useEffect(() => {
    console.log('useCiclos montou');

    async function fetchCiclos() {
      try {

        const ciclos = await getCiclos(); // ✅ já vem direto
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
    }

    fetchCiclos();
  }, []);

  return { cicloAtivo, historico };
}
