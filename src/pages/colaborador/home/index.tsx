import * as S from "./styles.ts";
import CardBox from "@/components/CardBox";
import { MdOutlineInsertInvitation } from "react-icons/md";
import { MdOutlineTimelapse } from "react-icons/md";
import { MdGrade } from "react-icons/md";
import CardContainer from "@/components/CardContainer/index.tsx";
import { useTheme } from "styled-components";
import { Sidebar } from "@/components/Sidebar";
import RowProgressBox from "@/components/RowProgressBox";
import StatusRowBox from "@/components/StatusRowBox";
import {Title} from "@/components/Title";
export function ColaboradorHome() {
  const theme = useTheme();
  return (
    <>
      <S.Wrapper>
        <Sidebar
          roles={["colaborador", "gestor", "rh", "comite"]}
          mainRole="comite"
          userName="João Gomes"
        />
        <S.Main>
          <Title>Olá, João Gomes</Title>
          <CardContainer>
            <CardBox
              icon={<MdOutlineInsertInvitation />}
              title="ciclo atual"
              bigSpan="2025.1"
              span="12 dias para o fim do ciclo"
            />
            <CardBox
              icon={<MdOutlineTimelapse />}
              title="progresso do ciclo"
              bigSpan="40%"
              progress={40}
            />
            <CardBox
              icon={<MdGrade />}
              title="ultima Avaliação"
              bigSpan="4.3"
              miniSpan="-0.3"
            />
          </CardContainer>

          <RowProgressBox
            title="Status do Ciclo Atual"
            bars={[
              {
                subtitle: "Autoavaliação",
                value: 100,
                color: theme.colors.success.default,
              },
              {
                subtitle: "Avaliação 360°",
                value: 10,
                color: theme.colors.error.default,
              },
              {
                subtitle: "Avaliação do Gestor",
                value: 0,
                color: theme.colors.secondary.default,
              },
            ]}
          />

          <StatusRowBox
            title="Situação das Metas"
            subtitle="Resumo do status de cada meta"
            items={[
              { value: "Concluida" , label: "Autoavaliação" },
              { value: "Em andamento", label: "Avaliação 360", concluidas: 1, total: 5 },
              { value: "Pendente", label: "Avaliação do gestor" },
            ]}
          />
        </S.Main>
      </S.Wrapper>
    </>
  );
}
