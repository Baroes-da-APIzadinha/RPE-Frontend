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
import { createCiclo } from "@/services/HTTP/ciclos";
// import { Card } from '@/components/Card';

function getStatusLabel(status: string): string {
  switch (status) {
    case "AGENDADO":
      return "AGENDADO"; 
    case "EM_ANDAMENTO":
      return "andamento";
    case "FECHADO":
      return "Finalizado";
    case "EM_REVISAO":
      return "Em revisão";
    case "EM_EQUALIZAÇÃO":
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
  const { cicloAtivo, historico, refetch } = useCiclos();

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("pt-BR");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event?: React.FormEvent) => {
    if (event) event.preventDefault();

    try {
      const {
        nomeCiclo,
        dataDeInicio,
        dataDeInicioRevisao,
        dataDeInicioEqualizacao,
        dataDeTermino,
      } = form;

      if (
        !nomeCiclo ||
        !dataDeInicio ||
        !dataDeInicioRevisao ||
        !dataDeInicioEqualizacao ||
        !dataDeTermino
      ) {
        alert("Preencha todos os campos de data e nome do ciclo.");
        return;
      }

      const [anoInit, mesInit, diaInit] = dataDeInicio.split("-").map(Number);
      const inicio = new Date(anoInit, mesInit - 1, diaInit);

      const revisao = new Date(dataDeInicioRevisao);
      const equalizacao = new Date(dataDeInicioEqualizacao);

      const [anoFim, mesFim, diaFim] = dataDeTermino.split("-").map(Number);
      const fim = new Date(anoFim, mesFim - 1, diaFim);

      const diasEntre = (start: Date, end: Date) => {
        const diffMs = end.getTime() - start.getTime();
        return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      };

      const cicloData = {
        nome: nomeCiclo,
        dataInicioAno: inicio.getFullYear(),
        dataInicioMes: inicio.getMonth() + 1,
        dataInicioDia: inicio.getDate(),

        dataFimAno: fim.getFullYear(),
        dataFimMes: fim.getMonth() + 1,
        dataFimDia: fim.getDate(),

        duracaoEmAndamentoDias: diasEntre(inicio, revisao),
        duracaoEmRevisaoDias: diasEntre(revisao, equalizacao),
        duracaoEmEqualizacaoDias: diasEntre(equalizacao, fim),
      };

      console.log("Payload enviado para o backend:", cicloData);
      await createCiclo(cicloData);
      await refetch();

      alert("Ciclo criado com sucesso!");
      setForm({
        nomeCiclo: "",
        dataDeInicio: "",
        dataDeInicioRevisao: "",
        dataDeInicioEqualizacao: "",
        dataDeTermino: "",
      });
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao criar ciclo:", error);
      alert("Erro ao criar ciclo. Veja o console para detalhes.");
    }
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
          <Button onClick={handleSubmit}>Salvar</Button>
        </S.ModalForm>
      </Modal>
      <S.CardContainer>
        {cicloAtivo && (
          <S.CardContainer>
            <TableBase title={cicloAtivo.destaqueTitulo}>
              <TableRowBox
                key={cicloAtivo.idCiclo}
                name={cicloAtivo.nomeCiclo}
                role={`Período: ${formatDate(
                  cicloAtivo.dataInicio
                )} a ${formatDate(cicloAtivo.dataFim)}`}
                status={getStatusLabel(cicloAtivo.status) as any}
                icon={<MdHistory size={64} />}
                onClick={() => {
                    console.log("Valor de cicloAtivo antes da navegação:", cicloAtivo);
                    navigate("/rh/cycle/criteria", { state: { cicloAtivo } });
                }}
              />
            </TableBase>
          </S.CardContainer>
        )}
      </S.CardContainer>
      <TableBase title="Histórico de Ciclos">
        {historico.map((ciclo) => (
          <TableRowBox
            icon={<MdHistory size={64} />}
            key={ciclo.idCiclo}
            name={ciclo.nomeCiclo}
            role={`Período: ${formatDate(ciclo.dataInicio)} a ${formatDate(
              ciclo.dataFim
            )}`}
            status={getStatusLabel(ciclo.status) as any}
            onClick={() => {
             
                navigate("/rh/cycle/criteria", { state: { ciclo } });
            }}
          />
        ))}
      </TableBase>
    </>
  );
}

export default RhCyclePage;
