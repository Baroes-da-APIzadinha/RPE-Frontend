import * as S from "./styles.ts";
import CardBox from "@/components/CardBox";
import { MdOutlineInsertInvitation } from "react-icons/md";
import { MdOutlineTimelapse } from "react-icons/md";
import { MdGrade } from "react-icons/md";
import CardContainer from "@/components/CardContainer/index.tsx";
import ChartBox from "@/components/ChartBox";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "styled-components";
import { Sidebar } from "@/components/Sidebar";
import RowProgressBox from "@/components/RowProgressBox";

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
          <h1>Página Inicial</h1>
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
                value: 80,
                color: theme.colors.success.default,
              },
               {
                subtitle: "Avaliaação 360°",
                value: 10,
                color: theme.colors.error.default,
              },
              {
                subtitle: "Avaliação do Gestor",
                value: 40,
                color: theme.colors.secondary.default,
              },
             
            ]}
          />
        </S.Main>
      </S.Wrapper>
    </>
  );
}
