import { Title } from '@/components/Title';
import * as S from './styles';
import { usePerfil } from '@/hooks/usePerfil';
import { Card } from '@/components/Card';
import { TableBase } from '@/components/TableBase';
import TableRowBox from '@/components/TableRowBox';
import { MdHistory } from 'react-icons/md';
import { cicloAtual, historicoCiclos } from '@/data/manageCycle';
import Button from '@/components/Button';

export function RhCyclePage() {
  const { perfil, loading } = usePerfil();
  if (loading || !perfil) return null;

  return (
    <>
      <S.TopBar>
        <Title>Gestão de Ciclos</Title>
        <Button onClick={() => { /* ação de criar ciclo */ }}>
          Criar ciclo
        </Button>
      </S.TopBar>
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
