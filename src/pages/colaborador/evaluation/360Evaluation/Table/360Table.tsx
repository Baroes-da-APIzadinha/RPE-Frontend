import React from "react";
import { mockColaboradores } from "@/data/colaboradores360";
import { useAvaliacoes360 } from "@/hooks/Avaliacoes360";
import * as S from "./styles";
import theme from "@/styles/theme";
import { TableBase } from "@/components/TableBase";
import TableRowBox from "@/components/TableRowBox";

interface Table360Props {
  onSelect: (id: number) => void;
}

const Table360: React.FC<Table360Props> = ({ onSelect }) => {
  const { getStatus } = useAvaliacoes360();

  const total = mockColaboradores.length;
  const concluidas = mockColaboradores.filter((c) => getStatus(c.id) === "avaliado").length;
  const andamento = mockColaboradores.filter((c) => getStatus(c.id) === "andamento").length;
  const pendentes = total - concluidas - andamento;

  const progresso = total > 0 ? Math.round((concluidas / total) * 100) : 0;

  return (
    <>
      <S.ProgressCard>
        <S.Header>
          <div>
            <S.Title>Avaliação de Pares</S.Title>
            <S.Subtitle>Avalie os colegas com quem você trabalhou nos últimos 6 meses</S.Subtitle>
          </div>
          <S.Right>
            <S.Porcentagem>{progresso}%</S.Porcentagem>
            <S.Label>Concluído</S.Label>
          </S.Right>
        </S.Header>
        <S.ProgressBar>
          <S.ProgressFill style={{ width: `${progresso}%` }} />
        </S.ProgressBar>
      </S.ProgressCard>

      <S.SummaryRow>
        <S.SummaryBox>
          <S.SummaryValue color={theme.colors.success.text}>{concluidas}</S.SummaryValue>
          <S.SummaryLabel>Concluídas</S.SummaryLabel>
        </S.SummaryBox>
        <S.SummaryBox>
          <S.SummaryValue color={theme.colors.warning}>{andamento}</S.SummaryValue>
          <S.SummaryLabel>Em Andamento</S.SummaryLabel>
        </S.SummaryBox>
        <S.SummaryBox>
          <S.SummaryValue>{pendentes}</S.SummaryValue>
          <S.SummaryLabel>Pendentes</S.SummaryLabel>
        </S.SummaryBox>
      </S.SummaryRow>

      <TableBase
        title="Colaboradores para avaliar"
        subtitle="Selecione os colaboradores abaixo para iniciar a avaliação"
      >
        {mockColaboradores.map((colaborador) => (
          <TableRowBox
            key={colaborador.id}
            name={colaborador.name}
            role={colaborador.role}
            workTime={colaborador.workTime}
            status={getStatus(colaborador.id)}
            onClick={() => onSelect(colaborador.id)}
          />
        ))}
      </TableBase>
    </>
  );
};

export default Table360;
