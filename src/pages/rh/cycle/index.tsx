import * as S from "./styles";
import React from "react";
import { Title } from "@/components/Title";
import { usePerfil } from "@/hooks/usePerfil";
import { TableBase } from "@/components/TableBase";
import TableRowBox from "@/components/TableRowBox";
import Input from "@/components/Input";
import { MdHistory } from "react-icons/md";
import Button from "@/components/Button";
import { Modal } from "@/components/Modal";
import { useNavigate } from "react-router-dom";
import { useCiclos } from "@/hooks/useTodosCiclos";
// import { Card } from '@/components/Card';

function getStatusLabel(status: string): string{
  switch (status) {
    case "AGENDADO":
      return "AGENDADO"; // ou outro valor estilizado
    case "EM_ANDAMENTO":
      return "andamento";
    case "FECHADO":
      return "Finalizado";
    case "REVISAO":
      return "Em revisão";
    case "EQUALIZACAO":
      return "Em equalização";
    default:
      return "pendente";
  }
}


export function RhCyclePage() {
  const navigate = useNavigate();
  const { perfil, loading } = usePerfil();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    nomeCiclo: "",
    dataDeInicio: "",
    dataDeInicioRevisao: "",
    dataDeInicioEqualizacao: "",
    dataDeTermino: "",
  });
  const { cicloAtivo, historico } = useCiclos();

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("pt-BR");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (loading || !perfil) return null;

  return (
    <>
      <S.TopBar>
        <Title>Gestão de Ciclos</Title>
        <Button onClick={() => setModalOpen(true)}>Criar ciclo</Button>
      </S.TopBar>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Criar novo ciclo"
      >
        <S.ModalForm>
          <Input
            label="Nome do ciclo"
            name="nomeCiclo"
            value={form.nomeCiclo}
            onChange={handleChange}
          />
          <S.DateRow>
            <Input
              label="Data de início"
              name="dataDeInicio"
              type="date"
              value={form.dataDeInicio}
              onChange={handleChange}
            />
            <Input
              label="Início da revisão"
              name="dataDeInicioRevisao"
              type="date"
              value={form.dataDeInicioRevisao}
              onChange={handleChange}
            />
          </S.DateRow>
          <S.DateRow>
            <Input
              label="Início da equalização"
              name="dataDeInicioEqualizacao"
              type="date"
              value={form.dataDeInicioEqualizacao}
              onChange={handleChange}
            />
            <Input
              label="Data de término"
              name="dataDeTermino"
              type="date"
              value={form.dataDeTermino}
              onChange={handleChange}
            />
          </S.DateRow>
          <Button>Salvar</Button>
        </S.ModalForm>
      </Modal>
      <S.CardContainer>
        {cicloAtivo && (
          <S.CardContainer>
            <TableBase title={cicloAtivo.destaqueTitulo}>
              <TableRowBox
                key={cicloAtivo.idCiclo}
                name={cicloAtivo.nomeCiclo}
                role={`Período: ${formatDate(cicloAtivo.dataInicio)} a ${formatDate(cicloAtivo.dataFim)}`}
                status={getStatusLabel(cicloAtivo.status) as any}
                icon={<MdHistory size={64} />}
                onClick={() => {
                  if (cicloAtivo.status === "AGENDADO") {
                    navigate("/rh/cycle/criteria");
                  }
                }}
              />
            </TableBase>
          </S.CardContainer>
        )}
      </S.CardContainer>
      <TableBase title="Histórico de Ciclos">
        {historico.map((ciclo, i) => (
          <TableRowBox
            icon={<MdHistory size={64} />}
            key={ciclo.idCiclo}
            name={ciclo.nomeCiclo}
            role={`Período: ${formatDate(ciclo.dataInicio)} a ${formatDate(ciclo.dataFim)}`}
            status={getStatusLabel(ciclo.status) as any}
            onClick={() => {
              if (ciclo.status === "AGENDADO") {
                navigate("/rh/cycle/criteria");
              }
            }}
          />
        ))}
      </TableBase>
    </>
  );
}

export default RhCyclePage;
