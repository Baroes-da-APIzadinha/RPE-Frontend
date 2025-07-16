import * as S from "./styles.ts";
import { Title } from "@/components/Title";
import CardContainer from "@/components/CardContainer";
import CardBox from "@/components/CardBox";
import { BsGraphUpArrow } from "react-icons/bs";
import {
  MdErrorOutline,
  MdGroup,
  MdOutlineAccessTime,
  MdOutlineCheckCircle,
  MdTrackChanges,
} from "react-icons/md";
import { AlertList } from "@/components/AlertList";
import { useOutletContext } from "react-router-dom";
import { useCicloAtual } from "@/hooks/useCicloAtual";
import { useLideradosComAvaliacao } from "@/hooks/avaliacoes/useLideradosComAvaliacao";
import type { PerfilData } from "@/types/PerfilData";
import { LoadingMessage } from "@/components/LoadingMessage/index.tsx";
import { EmptyMessage } from "@/components/EmptyMensage/index.tsx";
import { useCollaboratorReminder } from "@/hooks/useCollaboratorReminder";
import { toast } from "sonner";

export function ManagerDashboard() {

  const { createReminder } = useCollaboratorReminder();

  const handleSendReminder = async (idColaborador: string, message: string) => {
    try {
      await createReminder(idColaborador, message);
      toast.success("Lembrete enviado com sucesso!");
    } catch (error) {
      console.error('Erro ao enviar lembrete:', error);
    }
  };
  const { perfil } = useOutletContext<{ perfil: PerfilData }>();
  const idColaborador = perfil?.userId;

  const { cicloAtual } = useCicloAtual();
  const idCiclo = cicloAtual?.id;

  const { liderados, isLoading } = useLideradosComAvaliacao(
    idColaborador,
    idCiclo!
  );
  
  // Total da equipe
  const totalEquipe = liderados.length;

  // Cálculo de progresso
  const totalCriterios = liderados.length * 3; // exemplo: 3 critérios por colaborador
  const totalPreenchido = liderados.reduce(
    (acc, colab) =>
      acc +
      colab.cardsPreenchidos.filter(
        (c) => Number(c.nota) > 0 && c.justificativa?.trim() !== ""
      ).length,
    0
  );
  const progresso =
    totalCriterios === 0
      ? 0
      : Math.round((totalPreenchido / totalCriterios) * 100);

  // Cálculo da média geral
  const notasValidas = liderados
    .map((l) => Number(l.notaLider))
    .filter((n) => !isNaN(n) && n > 0);

  const mediaEquipe =
    notasValidas.length > 0
      ? (notasValidas.reduce((a, b) => a + b, 0) / notasValidas.length).toFixed(
          1
        )
      : "0.0";

  if (isLoading || !idCiclo) {
    return <LoadingMessage message="Carregando dados..." />;
  }


  if (liderados.length === 0) {
    return (
      <EmptyMessage
        icon={<MdGroup size={32} />}
        title="Sem colaboradores"
        description="Sua equipe ainda não possui colaboradores neste ciclo."
      />
    );
  }

  return (
    <>
      <S.Header>
        <Title>Página Inicial</Title>
      </S.Header>

      <CardContainer>
        <CardBox
          title="Total da Equipe"
          bigSpan={totalEquipe.toString()}
          span="colaboradores diretos"
          icon={<MdGroup />}
        />

        <CardBox
          title="Progresso Geral"
          bigSpan={`${progresso}%`}
          progress={progresso}
          icon={<MdTrackChanges />}
        />

        <CardBox
          title="Média da Equipe"
          bigSpan={mediaEquipe}
          miniSpan="+0.1" // Esse pode ser dinâmico depois
          span="vs anterior"
          icon={<BsGraphUpArrow />}
        />
      </CardContainer>

      <AlertList
        title="Alertas e Ações Necessárias"
        subtitle="Itens que requerem sua atenção"
        // @ts-ignore
        items={liderados
          .filter((colab) => colab.statusAutoavaliacao === "PENDENTE")
          .map((colab) => ({
            type: "red",
            icon: <MdErrorOutline />,
            title: `${colab.nomeCompleto} não iniciou a autoavaliação`,
            description: "Sem progresso detectado",
            buttonLabel: "Enviar Lembrete",
            onClick: () => handleSendReminder(
              colab.idColaborador, 
              "Sua autoavaliação ainda não foi iniciada. Solicitamos que realize o preenchimento o quanto antes para cumprir os prazos estabelecidos."
            ),
          }))
          .concat(
            liderados
              .filter((colab) => colab.statusAutoavaliacao === "EM_RASCUNHO")
              .map((colab) => ({
                type: "yellow",
                icon: <MdOutlineAccessTime />,
                title: `${colab.nomeCompleto} está em andamento`,
                description: "Pode precisar de suporte",
                buttonLabel: "Enviar Lembrete",
                onClick: () => handleSendReminder(
                  colab.idColaborador,
                  "Notamos que você iniciou sua autoavaliação, mas ela ainda não foi concluída. Se precisar de suporte, estaremos disponíveis para ajudar."
                ),
              }))
          )
          .concat(
            liderados
              .filter((colab) => colab.statusAutoavaliacao === "CONCLUIDA")
              .map((colab) => ({
                type: "green",
                icon: <MdOutlineCheckCircle />,
                title: `${colab.nomeCompleto} concluiu a autoavaliação`,
                description: "Parabenize pelo comprometimento",
                buttonLabel: "Parabenizar",
                onClick: () => handleSendReminder(
                  colab.idColaborador,
                  "Parabéns por concluir sua autoavaliação! Seu comprometimento e dedicação são fundamentais para o sucesso da equipe."
                ),
              }))
          )}
      />
    </>
  );
}
