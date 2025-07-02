import { Title } from '@/components/Title';
import * as S from './styles';
import { usePerfil } from '@/hooks/usePerfil';
import { Card } from '@/components/Card';
import { TableBase } from '@/components/TableBase';
import TableRowBox from '@/components/TableRowBox';
import { MdHistory } from 'react-icons/md';
import { cicloAtual, historicoCiclos } from '@/data/manageCycle';
import Button from '@/components/Button';
import { Modal } from '@/components/Modal';
import Input from '@/components/Input';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function getStatusLabel(status: string): string {
  return status;
}

export function RhCyclePage() {
  const { perfil, loading } = usePerfil();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    nomeCiclo: '',
    dataDeInicio: '',
    dataDeInicioRevisao: '',
    dataDeInicioEqualizacao: '',
    dataDeTermino: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (loading || !perfil) return null;

  return (
    <>
      <S.TopBar>
        <Title>Gestão de Ciclos</Title>
        <Button onClick={() => setModalOpen(true)}>
          Criar ciclo
        </Button>
      </S.TopBar>
      
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Criar novo ciclo">
      
          <S.ModalForm>
            <Input label="Nome do ciclo" name="nomeCiclo" value={form.nomeCiclo} onChange={handleChange} />
            <S.DateRow>
              <Input label="Data de início" name="dataDeInicio" type="date" value={form.dataDeInicio} onChange={handleChange} />
              <Input label="Início da revisão" name="dataDeInicioRevisao" type="date" value={form.dataDeInicioRevisao} onChange={handleChange} />
            </S.DateRow>
            <S.DateRow>
              <Input label="Início da equalização" name="dataDeInicioEqualizacao" type="date" value={form.dataDeInicioEqualizacao} onChange={handleChange} />
              <Input label="Data de término" name="dataDeTermino" type="date" value={form.dataDeTermino} onChange={handleChange} />
            </S.DateRow>
            <Button>
              Salvar  
            </Button>
          </S.ModalForm>
        
       
      </Modal>
      <S.CardContainer>
        <Card>
          <TableRowBox
          key={0}
          name= {cicloAtual.nome}
            role={`Período: ${cicloAtual.dataInicio} a ${cicloAtual.dataFim}`}
            status={getStatusLabel(cicloAtual.status) as any}
            icon={<MdHistory size={64} />}
            onClick={() => navigate('/rh/cycle/criteria')}
          />
        </Card>
      </S.CardContainer>
      <TableBase title="Histórico de Ciclos">
        {historicoCiclos.map((ciclo, i) => (
          <TableRowBox
            icon={<MdHistory size={64} />}
            key={i}
            name={ciclo.nome}
            role={`Período: ${ciclo.dataInicio} a ${ciclo.dataFim}`}
            status={getStatusLabel(ciclo.status) as any}
          />
        ))}
      </TableBase>
    </>
  );
}

export default RhCyclePage;
