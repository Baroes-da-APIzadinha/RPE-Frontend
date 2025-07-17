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
import { useConclusionProgressByBoard } from "@/hooks/rh/useConclusionProgressByBoard";
import { formatar } from "@/utils/formatters.ts";
import { useSetReminder } from "@/hooks/useSetReminder";
import { toast } from "sonner";
import { useNotasDistribuicao } from "@/hooks/rh/useNotasDistribuicao";

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
  const dadosTrilha = useConclusionProgressByBoard(cicloAtual?.id ?? "")
  const { setReminder } = useSetReminder();
  const { data: notasDistribuicaoAuto } = useNotasDistribuicao(cicloAtual?.id ?? "", 'AUTOAVALIACAO');
  const { data: notasDistribuicaoLider } = useNotasDistribuicao(cicloAtual?.id ?? "", 'AVALIACAO_LIDER');
  const { data: notasDistribuicaoPares } = useNotasDistribuicao(cicloAtual?.id ?? "", 'AVALIACAO_PARES');
  const toggleOptions = [
    { value: 'overview', label: 'Visão Geral', icon: <MdDashboard /> },
    { value: 'analytics', label: 'Análises', icon: <MdBarChart /> }
  ];
  const [detailedTab, setDetailedTab] = useState<'unidade' | 'trilha'>('unidade');

  const handleSendReminder = async () => {
    if (!cicloAtual) return;
    
    const days = treatTimeRemaining(cicloAtual.tempoRestante);
    const message = `Lembrete: O ciclo de avaliação "${cicloAtual.nome}" está se aproximando do fim. Restam apenas ${days} para conclusão.`;
    
    try {
      await setReminder(message);
      toast.success("Lembrete enviado com sucesso!");
    } catch (error) {
      console.error('Erro ao enviar lembrete:', error);
    }
  };

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

    const allAboveThreshold = unidadesData.every((unit) => unit.participacao > 80);
    if (allAboveThreshold) {
      return null;
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
        setDetailedTab("unidade");
      },
    };
  };

  const getLowestTrackParticipationAlert = () => {
    const trilhasData = dadosTrilha.data.map((item) => ({
      nome: item.nomeTrilha,
      participacao: Math.round((item.quantConcluidas / item.total) * 100),
    }));

    if (trilhasData.length === 0) {
      return {
        type: "blue" as const,
        icon: <MdGroups />,
        title: "Nenhuma trilha encontrada",
        description: "Não há dados de participação por trilha disponíveis",
        buttonLabel: "Ver Detalhes",
        onClick: () => {
          setActiveTab("analytics");
        },
      };
    }

    const allAboveThreshold = trilhasData.every((trilha) => trilha.participacao > 80);
    if (allAboveThreshold) {
      return null;
    }

    const lowestTrack = trilhasData.reduce((lowest, current) =>
      current.participacao < lowest.participacao ? current : lowest
    );

    // Determina a cor baseada na participação
    let alertType: "red" | "yellow" | "blue" = "blue";
    if (lowestTrack.participacao < 50) {
      alertType = "red";
    } else if (lowestTrack.participacao < 80) {
      alertType = "yellow";
    } else {
      alertType = "blue";
    }

    return {
      type: alertType,
      icon: <MdGroups />,
      title: `Baixa participação na trilha ${formatar(lowestTrack.nome)}`,
      description: `Apenas ${lowestTrack.participacao}% das avaliações foram concluídas nesta trilha`,
      buttonLabel: "Ver Detalhes",
      onClick: () => {
        setActiveTab("analytics");
        setDetailedTab("trilha");
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
      onClick: handleSendReminder,
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
          getLowestTrackParticipationAlert(),
        ].filter((item) => item !== null)}
      />
    </S.MainContent>
  );

  const renderAnalyticsTab = () => (
    <S.MainContent>
      <CardContainer>
        <ChartBox
          title="Distribuição de Notas"
          subtitle="Distribuição das notas por tipo de avaliação no ciclo atual"
        >
          <ReactApexChart
            type="bar"
            stacked={true}
            height={240}
            width={360}
            series={[
              {
                name: "Autoavaliação",
                data: Object.entries(notasDistribuicaoAuto).map(([faixa, quantidade]) => ({
                  x: faixa,
                  y: quantidade
                }))
              },
              {
                name: "Avaliação do Líder",
                data: Object.entries(notasDistribuicaoLider).map(([faixa, quantidade]) => ({
                  x: faixa,
                  y: quantidade
                }))
              },
              {
                name: "Avaliação de Pares",
                data: Object.entries(notasDistribuicaoPares).map(([faixa, quantidade]) => ({
                  x: faixa,
                  y: quantidade
                }))
              }
            ]}
            options={{
              chart: {
                toolbar: { show: false },
                zoom: { enabled: false },
                stacked: true,
                height: 240,
              },
              xaxis: {
                type: "category",
                title: { text: "Faixa de Notas" },
                categories: Object.keys(notasDistribuicaoAuto),
                labels: {
                  formatter: (val: string) => val,
                  rotate: 0,
                  style: {
                    fontSize: '11px'
                  }
                },
                tickAmount: Object.keys(notasDistribuicaoAuto).length,
                axisBorder: {
                  show: true
                },
                axisTicks: {
                  show: true
                }
              },
              yaxis: {
                title: { text: "Quantidade de Avaliações" },
                min: 0
              },
              colors: [theme.colors.chart.purple, theme.colors.chart.blue, theme.colors.chart.green],
              legend: { 
                position: "bottom",
                height: 30,
                offsetY: -5,
                fontSize: "11px"
              },
              dataLabels: { 
                enabled: false
              },
              grid: { show: true },
              tooltip: {
                shared: true,
                intersect: false,
                y: {
                  formatter: (val: number) => `${val} avaliações`
                }
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                }
              }
            }}
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

      <DetailedProgress title="Progresso Detalhado" value={detailedTab}/>
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
