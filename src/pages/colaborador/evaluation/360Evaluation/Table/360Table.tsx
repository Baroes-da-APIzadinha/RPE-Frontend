import React from "react";
import * as S from "./styles";
import { useAvaliacoes360 } from "@/hooks/Avaliacoes360";
import theme from "@/styles/theme";
import { TableBase } from "@/components/TableBase";
import TableRowBox from "@/components/TableRowBox";
import { useOutletContext } from "react-router-dom";
import { useAvaliacoesPares } from "@/hooks/avaliacoes/useAvaliacoesPares";
import type { PerfilData } from "@/types/PerfilData";

interface Table360Props {
  onSelect: (id: string) => void;
}

const Table360: React.FC<Table360Props> = ({ onSelect }) => {
  // const { getStatus } = useAvaliacoes360();

  const { perfil } = useOutletContext<{ perfil: PerfilData }>();
  const userId = perfil?.userId;
  const { avaliacoes, loading } = useAvaliacoesPares(userId);

  if (loading || !perfil?.userId) return <div>Carregando avaliações…</div>;

  const total = avaliacoes.length;
  const concluidas = avaliacoes.filter(a => a.status === "CONCLUIDA").length;
  const andamento = avaliacoes.filter(a => a.status === "EM_ANDAMENTO").length;
  const pendentes = total - concluidas - andamento;


  const progresso = total > 0 ? Math.round((concluidas / total) * 100) : 0;

  return (
    <>
      <S.ProgressCard>
        <S.Header>
          <div>
            <S.Title>Avaliação de Pares</S.Title>
            <S.Subtitle>
              Avalie os colegas com quem você trabalhou nos últimos 6 meses
            </S.Subtitle>
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
          <S.SummaryValue color={theme.colors.success.text}>
            {concluidas}
          </S.SummaryValue>
          <S.SummaryLabel>Concluídas</S.SummaryLabel>
        </S.SummaryBox>
        <S.SummaryBox>
          <S.SummaryValue color={theme.colors.warning}>
            {andamento}
          </S.SummaryValue>
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
        {avaliacoes.map((a) => (
          <TableRowBox
            key={a.idAvaliacao}
            name={a.avaliado.nomeCompleto}
            role="Colaborador"
            workTime={`${a.ciclo.nomeCiclo}`} 
            status={a.status as any}
            onClick={() => onSelect(a.idAvaliacao)} 
          />
        ))}
      </TableBase>
    </>
  );
};

export default Table360;
