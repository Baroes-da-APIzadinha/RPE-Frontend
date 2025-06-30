import * as S from "./styles.ts";
import { Title } from "@/components/Title";
import Button from "@/components/Button";
import {
  MdErrorOutline,
  MdFileDownload,
  MdGroups,
  MdInfoOutline,
  MdOutlineHomeWork,
  MdOutlineInsertInvitation,
  MdOutlinePeopleAlt,
  MdOutlineTaskAlt,
} from "react-icons/md";
import CardBox from "@/components/CardBox/index.tsx";
import theme from "@/styles/theme.ts";
import CardContainer from "@/components/CardContainer/index.tsx";
import ChartBox from "@/components/ChartBox/index.tsx";
import ReactApexChart from "react-apexcharts";
import { AlertList } from "@/components/AlertList/index.tsx";
import { DetailedProgress } from "@/components/DetailedProgress/index.tsx";
import { useCicloAtual } from "@/hooks/useCicloAtual";

export function RhDashboard() {

  const { cicloAtual, treatTimeRemaining } = useCicloAtual();


  return (
    <>
      <>
        <S.Header>
          <Title>Dashboard RH</Title>
          <S.HeaderButtons>
            <Button variant="outline">
              <MdFileDownload /> Exportar Relatório
            </Button>
          </S.HeaderButtons>
        </S.Header>

        <CardContainer>
          <CardBox
            icon={<MdOutlineInsertInvitation />}
            title="Ciclo atual"
            bigSpan={cicloAtual ? cicloAtual.nome : "Carregando..."}
            span={
              cicloAtual
                ? treatTimeRemaining(cicloAtual.tempoRestante)
                : "Carregando..."
            }
            alertSpanIcon={<MdErrorOutline />}
          />

          <CardBox
            icon={<MdOutlineTaskAlt />}
            title="Progresso Geral"
            bigSpan="44%"
            progress={44}
            span="876 de 1984 avaliações concluídas"
          />

          <CardBox
            icon={<MdOutlinePeopleAlt />}
            title="Colaboradores"
            bigSpan="248"
            span="Participando do ciclo"
          />
          <CardBox
            icon={<MdOutlineHomeWork />}
            title="Unidades"
            bigSpan="5"
            span="Unidades ativas"
          />
        </CardContainer>

        <CardContainer>
          <ChartBox
            title="Avaliações por Dia"
            subtitle="Número de avaliações concluídas nos últimos 7 dias"
          >
            <ReactApexChart
              type="bar"
              height={300}
              width={"100%"}
              options={{
                chart: { toolbar: { show: false } },
                xaxis: {
                  categories: [
                    "01/5",
                    "02/5",
                    "03/5",
                    "04/5",
                    "05/5",
                    "06/5",
                    "07/5",
                  ],
                },
                yaxis: {
                  labels: { style: { fontSize: "12px" } },
                },
                plotOptions: {
                  bar: { borderRadius: 4, columnWidth: "40%" },
                },
                colors: [theme.colors.chart.blue],
                dataLabels: { enabled: false },
              }}
              series={[
                {
                  name: "Avaliações",
                  data: [45, 52, 39, 66, 75, 58, 65],
                },
              ]}
            />
          </ChartBox>
          <ChartBox
            title="Distribuição de Status"
            subtitle="Status atual de todas as avaliações do ciclo"
          >
            <ReactApexChart
              type="pie"
              height={300}
              width={"100%"}
              series={[299, 176, 150]}
              options={{
                labels: ["Concluídas", "Em Andamento", "Pendentes"],
                chart: { toolbar: { show: false } },
                colors: [
                  theme.colors.success.default,
                  theme.colors.secondary.default,
                  theme.colors.error.default,
                ],
                legend: {
                  position: "bottom",
                  fontSize: "12px",
                },
                dataLabels: {
                  enabled: true,
                  formatter: (val: number, opts: any) => {
                    const label = opts.w.globals.labels[opts.seriesIndex];
                    const value = opts.w.globals.series[opts.seriesIndex];
                    return `${label} ${value}`;
                  },
                },
              }}
            />
          </ChartBox>
        </CardContainer>

        <DetailedProgress title="Progresso Detalhado" />

        <AlertList
          title="Alertas e Ações Necessárias"
          subtitle="Itens que requerem sua atenção"
          items={[
            {
              type: "red",
              icon: <MdErrorOutline />,
              title: "Prazo se aproximando",
              description: "Restam apenas 12 dias para o fim do ciclo",
              buttonLabel: "Enviar Lembrete",
              onClick: () => console.log("Enviar Lembrete"),
            },
            {
              type: "yellow",
              icon: <MdInfoOutline />,
              title: "Baixa participação na unidade Recife",
              description: "Apenas 31% das avaliações foram concluídas",
              buttonLabel: "Ver Detalhes",
              onClick: () => console.log("Ver Detalhes"),
            },
            {
              type: "blue",
              icon: <MdGroups />,
              title: "Novos colaboradores adicionados",
              description: "5 novos colaboradores foram adicionados ao ciclo",
              buttonLabel: "Revisar",
              onClick: () => console.log("Revisar"),
            },
          ]}
        />
      </>
    </>
  );
}
