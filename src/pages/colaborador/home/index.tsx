import { useTheme } from "styled-components";
import RowProgressBox from "@/components/RowProgressBox";
import { Title } from "@/components/Title";
import { useCicloAtual } from "@/hooks/useCicloAtual";
import { CicloStatusBox } from "@/components/CicloStatusBox";
import { TableBase } from "@/components/TableBase/index.tsx";
import { useProgressoAvaliacao } from "@/hooks/avaliacoes/useProgressoAvaliacao";
import { useOutletContext } from "react-router-dom";
import type { PerfilData } from "@/types/PerfilData";
import { EmptyMessage } from "@/components/EmptyMensage";
import { MdAccountCircle } from "react-icons/md";
import { LoadingMessage } from "@/components/LoadingMessage";

export function ColaboradorHome() {
  const theme = useTheme();
  const { perfil } = useOutletContext<{ perfil: PerfilData }>();
  const { cicloAtual } = useCicloAtual();
  const { progresso, loading } = useProgressoAvaliacao();

  const isEmpty = !progresso || Object.values(progresso).every((p) => p === 0);

  function getColorFromProgress(value: number) {
    if (value === 100) return theme.colors.primary.default;
    if (value >= 75) return theme.colors.success.default;
    if (value >= 25) return theme.colors.secondary.default;
    return theme.colors.error.default;
  }

  if (loading) {
    return <LoadingMessage message="Carregando dados do ciclo..." />;
  }

  if (isEmpty) {
    return (
      <EmptyMessage
        icon={<MdAccountCircle size={32} />}
        title="Ainda sem progresso neste ciclo"
        description="Assim que as avaliações forem liberadas, você poderá acompanhar seu avanço por aqui."
      />
    );
  }

  if (!perfil.roles.includes("colaborador")) {
    return (
      <EmptyMessage
        icon={<MdAccountCircle size={32} />}
        title="Acesso restrito"
        description="Esta página está disponível apenas para colaboradores."
      />
    );
  }

  return (
    <>
      <Title>Seja bem-vindo(a), {perfil?.userName}</Title>

      <TableBase
        title={"Status do ciclo atual"}
        subtitle={"Veja o status do ciclo atual e as etapas concluídas"}
      >
        <CicloStatusBox
          steps={[
            { label: "Agendado", active: cicloAtual?.status === "AGENDADO" },
            {
              label: "Em Andamento",
              active: cicloAtual?.status === "EM_ANDAMENTO",
            },
            {
              label: "Em Revisão",
              active: cicloAtual?.status === "EM_REVISAO",
            },
            {
              label: "Em Equalização",
              active: cicloAtual?.status === "EM_EQUALIZAÇÃO",
            },
          ]}
        />
      </TableBase>

      <RowProgressBox
        title="Progresso no ciclo atual"
        bars={[
          {
            subtitle: "Autoavaliação",
            value: progresso.autoavaliacao,
            color: getColorFromProgress(progresso.autoavaliacao),
          },
          {
            subtitle: "Avaliação de Pares",
            value: progresso.avaliacaoPares,
            color: getColorFromProgress(progresso.avaliacaoPares),
          },
          {
            subtitle: "Avaliação do Mentor",
            value: progresso.avaliacaoMentor,
            color: getColorFromProgress(progresso.avaliacaoMentor),
          },
        ]}
      />
    </>
  );
}
