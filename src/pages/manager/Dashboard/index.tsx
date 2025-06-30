import { Title } from "@/components/Title/index.tsx";
import * as S from "./styles.ts";
import { Sidebar } from "@/components/Sidebar/index.tsx";
import CardContainer from "@/components/CardContainer/index.tsx";
import CardBox from "@/components/CardBox/index.tsx";
import { BsGraphUpArrow } from "react-icons/bs";
import {
  MdAccountCircle,
  MdArrowForward,
  MdErrorOutline,
  MdGroup,
  MdOutlineAccessTime,
  MdOutlineCheckCircle,
  MdTrackChanges,
} from "react-icons/md";
import { PiTargetBold } from "react-icons/pi";
import { Card } from "@/components/Card/index.tsx";
import ReactApexChart from "react-apexcharts";
import type ApexCharts from "apexcharts";
import { useTheme } from "styled-components";
import Button from "@/components/Button/index.tsx";
import { AlertList } from "@/components/AlertList/index.tsx";
import { usePerfil } from "@/hooks/usePerfil.ts";

export function MananegerDashboard() {
  const { perfil, loading } = usePerfil();

  const theme = useTheme();
  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "radialBar" as const,
      sparkline: { enabled: true },
    },
    plotOptions: {
      radialBar: {
        hollow: { size: "60%" },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: "2.25rem",
            fontWeight: 700,
            offsetY: 10,
            color: "#000",
          },
        },
        track: {
          background: "#E0E0E0",
        },
      },
    },
    stroke: { lineCap: "round" },
    colors: [theme.colors.secondary.default],
  };

  const chartSeries = [70];

  const colaboradores = [
    {
      nome: "João Silva",
      cargo: "Desenvolvedor Senior",
      status: "concluida",
      nota: "4.2",
      data: "08-06-2025",
    },
    {
      nome: "Ana Costa",
      cargo: "Desenvolvedor Pleno",
      status: "andamento",
      nota: "4.1",
      data: "06-06-2025",
    },
    {
      nome: "Pedro Santos",
      cargo: "Desenvolvedor Junior",
      status: "andamento",
      nota: "3.8",
      data: "05-06-2025",
    },
    {
      nome: "Carla Mendes",
      cargo: "QA Analyst",
      status: "pendente",
      nota: "4.0",
      data: "15-06-2025",
    },
  ];

  if (loading || !perfil) return null;

  return (
    <S.Wrapper>
      <Sidebar
        roles={perfil.roles}
        mainRole={perfil.mainRole}
        userName={perfil.userName}
      />
      <S.Main>
        <Title>Página Inicial</Title>

        <CardContainer>
          <CardBox
            title="Total da Equipe"
            bigSpan="8"
            span="colaboradores diretos"
            icon={<MdGroup />}
          />

          <CardBox
            title="Progresso Geral"
            bigSpan="63%"
            progress={63}
            icon={<MdTrackChanges />}
          />

          <CardBox
            title="Média da Equipe"
            bigSpan="4.2"
            miniSpan="+0.1"
            span="vs anterior"
            icon={<BsGraphUpArrow />}
          />

          <CardBox
            title="Meta do Ciclo"
            bigSpan="4.3"
            span="Objetivo"
            alertSpan="Em progresso"
            icon={<PiTargetBold />}
          />
        </CardContainer>

        <Card>
          <S.PendingWrapper>
            <S.LeftWrapper>
              <S.CircleWrapper>
                <ReactApexChart
                  options={chartOptions}
                  series={chartSeries}
                  type="radialBar"
                  height={190}
                  width={190}
                />
              </S.CircleWrapper>
              <S.People>
                <MdGroup size={64} />
                <span>3</span>
              </S.People>
            </S.LeftWrapper>
            <S.Divider />
            <S.InfoWrapper>
              <S.Description>
                Você tem <strong>3 Revisões pendentes</strong>
              </S.Description>
            </S.InfoWrapper>
          </S.PendingWrapper>
        </Card>

        <Card>
          <S.HeaderRow>
            <div>
              <S.SectionTitle>Status da Equipe</S.SectionTitle>
              <S.SectionSubtitle>
                Progresso individual das avaliações
              </S.SectionSubtitle>
            </div>
            <Button variant="outline">
              Ver Todos <MdArrowForward />
            </Button>
          </S.HeaderRow>

          <S.CollaboratorList>
            {colaboradores.map((colab, index) => (
              <S.CollaboratorCard key={index}>
                <S.UserInfo>
                  <MdAccountCircle size={64} />
                  <S.TextDiv>
                    <S.Name>{colab.nome}</S.Name>
                    <S.Role>{colab.cargo}</S.Role>
                  </S.TextDiv>
                </S.UserInfo>

                <S.UserStatus>
                  <div>
                    <S.StatusLabel>Progresso</S.StatusLabel>
                    <S.StatusBadge $status={colab.status}>
                      {colab.status === "concluida" && (
                        <>
                          <MdOutlineCheckCircle size={20} color={theme.colors.success.text} />
                          Concluída
                        </>
                      )}
                      {colab.status === "andamento" && (
                        <>
                          <MdOutlineAccessTime size={20} color={theme.colors.secondary.default} />
                          Em andamento
                        </>
                      )}
                      {colab.status === "pendente" && (
                        <>
                          <MdErrorOutline size={20} color={theme.colors.error.text} />
                          Pendente
                        </>
                      )}
                    </S.StatusBadge>
                  </div>
                  <div>
                    <S.StatusLabel>Desempenho</S.StatusLabel>
                    <S.Score>{colab.nota}</S.Score>
                  </div>
                  <div>
                    <S.StatusLabel>Última Avaliação</S.StatusLabel>
                    <S.Date>{colab.data}</S.Date>
                  </div>
                </S.UserStatus>
              </S.CollaboratorCard>
            ))}
          </S.CollaboratorList>
        </Card>

        <AlertList title="Alertas e Ações Necessárias"
                  subtitle="Itens que requerem sua atenção"
                  items={[
                    {
                      type: "red",
                      icon: <MdErrorOutline />,
                      title: "Carla Mendes não iniciou avaliação",
                      description: "Sem progresso há 3 semanas",
                      buttonLabel: "Enviar Lembrete",
                      onClick: () => console.log("Enviar Lembrete"),
                    },
                    {
                      type: "yellow",
                      icon: <MdOutlineAccessTime />,
                      title: "Pedro Santos precisa de suporte",
                      description: "Progresso lento na autoavaliação",
                      buttonLabel: "Agendar 1:1",
                      onClick: () => console.log("Agendar 1:1"),
                    },
                    {
                      type: "green",
                      icon: <MdOutlineCheckCircle />,
                      title: "João Silva completou todas as avaliações",
                      description: "Primeiro da equipe a finalizar o ciclo",
                      buttonLabel: "Parabenizar",
                      onClick: () => console.log("Parabenizar"),
                    },
                  ]}/>
      </S.Main>
    </S.Wrapper>
  );
}
