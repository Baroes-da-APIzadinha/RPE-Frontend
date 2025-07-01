import { Title } from '@/components/Title';
import * as S from './styles';
import { usePerfil } from '@/hooks/usePerfil';
import { Card } from '@/components/Card';
import { TableBase } from '@/components/TableBase';
import TableRowBox from '@/components/TableRowBox';
import { MdHistory } from 'react-icons/md';

const cicloAtual = {
  nome: '2025.1',
  status: 'Em andamento',
  dataInicio: '01/03/2025',
  dataFim: '30/06/2025',
};

const historicoCiclos = [
  { nome: '2024.2', status: 'Finalizado', dataInicio: '01/09/2024', dataFim: '31/12/2024' },
  { nome: '2024.1', status: 'Finalizado', dataInicio: '01/03/2024', dataFim: '30/06/2024' },
  { nome: '2023.2', status: 'Finalizado', dataInicio: '01/09/2023', dataFim: '31/12/2023' },
];

export function RhCyclePage() {
  const { perfil, loading } = usePerfil();
  if (loading || !perfil) return null;

  return (
    <>
      <Title>Gestão de Ciclos</Title>
      <S.CardContainer>
        <Card>
          <TableRowBox
          key={0}
          name= {cicloAtual.nome}
            role={`Período: ${cicloAtual.dataInicio} a ${cicloAtual.dataFim}`}
            status={cicloAtual.status === 'Em andamento' ? 'andamento' : cicloAtual.status === 'Finalizado' ? 'Finalizado' : 'pendente'}
            icon={<MdHistory size={64} />}
          ></TableRowBox>
        </Card>
      </S.CardContainer>
      <TableBase title="Histórico de Ciclos">
        {historicoCiclos.map((ciclo, i) => (
          <TableRowBox
            icon={<MdHistory size={64} />}
            key={i}
            name={ciclo.nome}
            role={`Período: ${ciclo.dataInicio} a ${ciclo.dataFim}`}
            status={ciclo.status === 'Finalizado' ? 'Finalizado' : ciclo.status === 'Em andamento' ? 'andamento' : 'pendente'}
          />
        ))}
      </TableBase>
    </>
  );
}

export default RhCyclePage;
