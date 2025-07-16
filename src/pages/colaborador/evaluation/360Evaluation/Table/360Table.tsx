import React from "react";
import * as S from "./styles";
import theme from "@/styles/theme";
import { TableBase } from "@/components/TableBase";
import TableRowBox from "@/components/TableRowBox";
import { useOutletContext } from "react-router-dom";
import { useAvaliacoesPares } from "@/hooks/avaliacoes/useAvaliacoesPares";
import type { PerfilData } from "@/types/PerfilData";
import { LoadingMessage } from "@/components/LoadingMessage";
import { formatStatus } from "@/utils/formatters";
import RowProgressBox from "@/components/RowProgressBox";
import { EmptyMessage } from "@/components/EmptyMensage";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";

interface Table360Props {
  onSelect: (id: string) => void;
}

const Table360: React.FC<Table360Props> = ({ onSelect }) => {
  const { perfil } = useOutletContext<{ perfil: PerfilData }>();
  const userId = perfil?.userId;
  const { avaliacoes, loading } = useAvaliacoesPares(userId);

  const total = avaliacoes.length;
  const concluidas = avaliacoes.filter((a) => a.status === "CONCLUIDA").length;
  const andamento = avaliacoes.filter((a) => a.status === "EM_RASCUNHO").length;
  const pendentes = total - concluidas - andamento;

  const progresso = total > 0 ? Math.round((concluidas / total) * 100) : 0;

  if (loading || !perfil?.userId) {
    return <LoadingMessage message="Carregando avaliações de pares…" />;
  }

  if (!loading && avaliacoes.length === 0) {
    return (
      <EmptyMessage
        icon={<MdOutlineAssignmentTurnedIn size={32} />}
        title="Nenhuma avaliação de pares encontrada"
        description="Verifique com sua liderança se você foi incluído no ciclo atual."
      />
    );
  }

  return (
    <>
      <RowProgressBox
        title="Avaliação de Pares"
        bars={[
          {
            subtitle:
              " Avalie os colegas com quem você trabalhou no último ciclo",
            value: progresso,
          },
        ]}
      />

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
            status={formatStatus(a.status)}
            onClick={() => onSelect(a.idAvaliacao)}
          />
        ))}
      </TableBase>
    </>
  );
};

export default Table360;
