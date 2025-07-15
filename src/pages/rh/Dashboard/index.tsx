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
  MdBarChart,
  MdDashboard,
} from "react-icons/md";
import CardBox from "@/components/CardBox/index.tsx";
import theme from "@/styles/theme.ts";
import CardContainer from "@/components/CardContainer/index.tsx";
import ChartBox from "@/components/ChartBox/index.tsx";
import ReactApexChart from "react-apexcharts";
import { AlertList } from "@/components/AlertList/index.tsx";
import { DetailedProgress } from "@/components/DetailedProgress/index.tsx";
import { ToggleBar } from "@/components/ToggleBar";
import { useCicloAtual } from "@/hooks/useCicloAtual";
import { useCollaboratorsCount } from "@/hooks/rh/useCollaboratorsCount.ts";
import { useUnidadesCount } from "@/hooks/rh/useUnidadesCount.ts";
import { useEvaluationStatusCount } from "@/hooks/rh/useEvaluationStatusCount.ts";
import { useState } from "react";
import { usePerfil } from "@/hooks/usePerfil.ts";
import { useConclusionProgressByUnit } from "@/hooks/rh/useConclusionProgressByUnit";
import { formatar } from "@/utils/formatters.ts";

function getStatusPercentage(statusCount: number, total: number) : number {
  if (total === 0) return 0;

  const percentage = Number(((statusCount / total) * 100).toFixed(2));

  return percentage;
}


export function RhDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics'>('overview');
  const { cicloAtual, treatTimeRemaining } = useCicloAtual();  
  const { count } = useCollaboratorsCount(cicloAtual?.id ?? "");
  const { unitCount } = useUnidadesCount();
  const { quantConcluidas, quantPendentes, quantEmAndamento } = useEvaluationStatusCount(cicloAtual?.id ?? "");
  const total = (quantConcluidas) + (quantPendentes) + (quantEmAndamento);
  const concludedPercentage = getStatusPercentage((quantConcluidas), total);
  const { perfil } = usePerfil();
  const dadosUnidade = useConclusionProgressByUnit(cicloAtual?.id ?? "")
  const toggleOptions = [
    { value: 'overview', label: 'Visão Geral', icon: <MdDashboard /> },
    { value: 'analytics', label: 'Análises', icon: <MdBarChart /> }
  ];

  const getLowestParticipationAlert = () => {
    const unidadesData = dadosUnidade.data.map((item) => ({
      nome: item.nomeUnidade,
      participacao: Math.round((item.quantConcluidas / item.total) * 100),
    }));

    if (unidadesData.length === 0) {
      return {
        type: "yellow" as const,
        icon: <MdInfoOutline />,
        title: "Nenhuma unidade encontrada",
        description: "Não há dados de participação disponíveis",
        buttonLabel: "Ver Detalhes",
        onClick: () => {
          setActiveTab("analytics");
        },
      };
    }

    const lowestUnit = unidadesData.reduce((lowest, current) =>
      current.participacao < lowest.participacao ? current : lowest
    );

    return {
      type: "yellow" as const,
      icon: <MdInfoOutline />,
      title: `Baixa participação na unidade ${formatar(lowestUnit.nome)}`,
      description: `Apenas ${lowestUnit.participacao}% das avaliações foram concluídas`,
      buttonLabel: "Ver Detalhes",
      onClick: () => {
        setActiveTab("analytics");
      },
    };
  };

  const getTimeRemainingAlert = () => {
    if (!cicloAtual) return null;

    const timeRemaining = cicloAtual.tempoRestante;
    const days = (treatTimeRemaining(timeRemaining))
    
    let type: "red" | "yellow" | "blue" = "blue";
    let title = "";
    let description = "";
    let daysCheck = Number(days[0] + days[1]) 
    console.log("Ciclo Atual:", daysCheck);
    if (!days.includes("dias")) {
      type = "red";
      title = "Urgente: Prazo se aproximando";
    }
    else if (daysCheck >= 30) {
      type = "blue";
      title = "Tempo suficiente para o ciclo";
    } 
    else if (daysCheck >= 10) {
      type = "yellow";
      title = "Atenção: Prazo se aproximando";
    } 
    else {
      type = "red";
      title = "Urgente: Prazo se aproximando";
    }
    description = "Apenas " + days + " para o fim do ciclo";
    return {
      type,
      icon: <MdErrorOutline />,
      title,
      description,
      buttonLabel: "Enviar Lembrete",
      onClick: () => console.log("Enviar Lembrete"),
    };
  };
  const renderOverviewTab = () => (
    <S.MainContent>
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
          bigSpan={`${concludedPercentage}%`}
          progress={(concludedPercentage)}
          span= {`${quantConcluidas} concluídas de ${total} avaliações`}
        />

        <CardBox
          icon={<MdOutlinePeopleAlt />}
          title="Colaboradores"
          bigSpan={(count ?? 0).toString()}
          span="Participando do ciclo"
        />
        <CardBox
          icon={<MdOutlineHomeWork />}
          title="Unidades"
          bigSpan={unitCount?.toString() ?? "Carregando..."}
          span="Unidades ativas"
        />
      </CardContainer>

      <AlertList
        title="Alertas e Ações Necessárias"
        subtitle="Itens que requerem sua atenção"
        items={[
          ...(cicloAtual ? [getTimeRemainingAlert()!] : []),
          getLowestParticipationAlert(),
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
    </S.MainContent>
  );

  const renderAnalyticsTab = () => (
    <S.MainContent>
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
            key={[quantConcluidas, quantEmAndamento, quantPendentes].join('-')}
            type="pie"
            height={"100%"}
            width={"100%"}
            series={[ quantConcluidas, quantEmAndamento, quantPendentes ]}
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
                fontSize: "11px",
              },
              dataLabels: {
                enabled: true,
                 formatter: (val: number) => {
                  return `${val.toFixed(0)}%`;
                },

              },
            }}
          />
        </ChartBox>
      </CardContainer>

      <DetailedProgress title="Progresso Detalhado" />
    </S.MainContent>
  );

  return (
    <>
      <S.Header>
        <Title>Bem vindo(a), {perfil?.userName}</Title>
        <S.HeaderButtons>
          <Button variant="outline">
            <MdFileDownload /> Exportar Relatório
          </Button>
        </S.HeaderButtons>
      </S.Header>

      <ToggleBar
        items={toggleOptions}
        value={activeTab}
        onChange={(value) => setActiveTab(value as 'overview' | 'analytics')}
      />

      <S.TabContent>
        {activeTab === 'overview' ? renderOverviewTab() : renderAnalyticsTab()}
      </S.TabContent>
    </>
  );
}
