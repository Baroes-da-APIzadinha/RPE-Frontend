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

export function Home() {
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
            <CardBox
              icon={<MdGrade />}
              title="ultima Avaliação"
              bigSpan="4.3"
              miniSpan="+0.3"
            />
          </CardContainer>
          <CardContainer>
            <ChartBox title="Performance ao longo dos meses">
              <ReactApexChart
                type="line"
                height={220}
                width={"100%"}
                series={[
                  {
                    name: "Performance",
                    data: [3.5, 4.0, 4.2, 4.1, 4.3, 4.5, 4.4],
                  },
                ]}
                options={{
                  chart: { toolbar: { show: false } },
                  xaxis: {
                    categories: [
                      "Jan",
                      "Fev",
                      "Mar",
                      "Abr",
                      "Mai",
                      "Jun",
                      "Jul",
                    ],
                  },
                  colors: [theme.colors.primary.default],
                  stroke: { width: 3 },
                  dataLabels: { enabled: false },
                  grid: { strokeDashArray: 4 },
                }}
              />
            </ChartBox>
            <ChartBox title="divisão de status das avaliações">
              <ReactApexChart
                type="pie"
                height={220}
                width={"100%"}
                series={[3, 2, 10]}
                options={{
                  labels: ["Concluido", "Pendente", "Em Andamento"],
                  chart: { toolbar: { show: false } },
                  colors: [
                    theme.colors.success.default,
                    theme.colors.error.default,
                    theme.colors.chart.yellow,
                  ],
                  legend: { position: "bottom" },
                  dataLabels: { enabled: true },
                  tooltip: { enabled: true },
                }}
              />
            </ChartBox>
          </CardContainer>
        </S.Main>
      </S.Wrapper>
    </>
  );
}
