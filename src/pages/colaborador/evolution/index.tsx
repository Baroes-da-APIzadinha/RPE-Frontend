import * as S from "./styles.ts";
import { Sidebar } from "@/components/Sidebar/index.tsx";
import CardConteiner from "@/components/CardContainer/index.tsx";
import CardBox from "@/components/CardBox/index.tsx";
import { Title } from "@/components/Title/index.tsx";
import { MdGrade } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { IoMdTrophy } from "react-icons/io";
import ReactApexChart from "react-apexcharts";
import ChartBox from "@/components/ChartBox/index.tsx";
import { useTheme } from "styled-components";

export function ColaboradorEvolution() {
  const theme = useTheme();

  return (
    <>
      <S.Wrapper>
        <Sidebar
          roles={["colaborador"]}
          mainRole="comite"
          userName="João Gomes"
        />

        <S.Main>
          <Title>Sua evolução na RocketCorp</Title>

          <CardConteiner>
            <CardBox
              title="Nota atual"
              bigSpan="4.3"
              miniSpan="-0.3"
              icon={<MdGrade />}
            />
            <CardBox
              title="Avaliações"
              bigSpan="12"
              span="recebidas no total"
              icon={<FaFileAlt />}
            />
            <CardBox
              title="Pilar em destaque"
              bigSpan="Execução"
              span="media de 4.5"
              icon={<IoMdTrophy />}
            />
          </CardConteiner>

          <CardConteiner>
            <ChartBox title="Performance ao longo dos ciclos avaliativos">
              <ReactApexChart
                type="line"
                height={"100%"}
                width={400}
                
                series={[
                  {
                    name: "Performance",
                    data: [3.5, 4.0, 4.2, 4.1, 4.3, 4.5, 4.4],
                  },
                ]}
                options={{
                  chart: {
                    toolbar: { show: false },
                    zoom: { enabled: false },
                     
                  },
                  xaxis: {
                    categories: [
                      "2023.1",
                      "2023.2",
                      "2023.3",
                      "2023.4",
                      "2024.1",
                      "2024.2",
                      "2024.3",
                    ],
                  },
                  yaxis: {
                    title: { text: "Nota" },
                  },
                  colors: [theme.colors.primary.default],
                  dataLabels: { enabled: true },
                
                }}
              />
            </ChartBox>
            <ChartBox title="Avaliação por pilar">
              <ReactApexChart
                type="radar"
                height={320}
                width={500}
                series={[
                  {
                    name: "Nota",
                    data: [4.5, 4.2, 4.0, 3.8, 4.3],
                  },
                ]}
                options={{
                  chart: {
                    toolbar: { show: false },
                  },
                  xaxis: {
                    categories: [
                      "Execução",
                      "Colaboração",
                      "Inovação",
                      "Liderança",
                      "Entrega",
                    ],
                  },
                  yaxis: {
                    min: 0,
                    max: 5,
                    tickAmount: 5,

                  },
                  stroke: {
                    show: true,
                    width: 2,
                  },
                  fill: {
                    opacity: 0.2,
                  },
                  markers: {
                    size: 2,
                  },
                  colors: [theme.colors.primary.default],
                  dataLabels: {
                    enabled: true,
                  },
                  title: {
                    text: undefined,
                  },
                }}
              />
            </ChartBox>
          </CardConteiner>
          <CardConteiner>
            <ChartBox title="Evolução por critério avaliativo">
              <ReactApexChart
                type="line"
                height={280}
                width={900}
                series={[
                  {
                    name: "Execução",
                    data: [4.2, 4.3, 4.1, 4.4, 4.5, 4.3, 4.4],
                  },
                  {
                    name: "Colaboração",
                    data: [3.8, 4.0, 4.1, 4.0, 4.2, 4.1, 4.3],
                  },
                  {
                    name: "Inovação",
                    data: [4.0, 4.1, 4.0, 4.2, 4.1, 4.0, 4.2],
                  },
                  {
                    name: "Liderança",
                    data: [3.7, 3.9, 4.0, 4.1, 4.0, 4.2, 4.1],
                  },
                  {
                    name: "Entrega",
                    data: [4.1, 4.2, 4.3, 4.2, 4.4, 4.3, 4.5],
                  },
                ]}
                options={{
                  chart: {
                    toolbar: { show: false },
                    zoom: { enabled: false },
                  },
                  xaxis: {
                    categories: [
                      "2023.1",
                      "2023.2",
                      "2023.3",
                      "2023.4",
                      "2024.1",
                      "2024.2",
                      "2024.3",
                    ],
                  },
                  yaxis: {
                    min: 0,
                    max: 5,
                    tickAmount: 5,
                    title: { text: "Nota" },
                  },
                  colors: [
                    theme.colors.primary.default,
                    theme.colors.success.default,
                    theme.colors.secondary.default,
                    theme.colors.error.default,
                    theme.colors.chart.purple,
                  ],
                  dataLabels: { enabled: false },
                  stroke: { width: 2 },
                  legend: { show: true },
                }}
              />
            </ChartBox>
          </CardConteiner>
        </S.Main>
      </S.Wrapper>
    </>
  );
}
