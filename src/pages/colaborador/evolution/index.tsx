import CardConteiner from "@/components/CardContainer/index.tsx";
import CardBox from "@/components/CardBox/index.tsx";
import { Title } from "@/components/Title/index.tsx";
import { MdAccountCircle, MdArrowBack, MdGrade } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { IoMdTrophy } from "react-icons/io";
import ReactApexChart from "react-apexcharts";
import ChartBox from "@/components/ChartBox/index.tsx";
import { useTheme } from "styled-components";
import { usePerfil } from "@/hooks/usePerfil";
import { useColaboradorNotasHistorico } from "@/hooks/colaboradores/useColaboradorNotasHistorico";
import { useColaboradorPilarNotas } from "@/hooks/colaboradores/useColaboradorPilarNotas";
import type { CicloPilarNotas, PilarNota } from "@/types/PilarNota.ts";
import { useCountAvaliacoes } from "@/hooks/colaboradores/useCountAvaliacoes";
import * as S from "./styles";
import { useEffect, useState } from "react";
import { EmptyMessage } from "@/components/EmptyMensage";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import type { PerfilData } from "@/types/PerfilData";
import Button from "@/components/Button";

function getHigherPilar(pilarNotas: CicloPilarNotas[]) {
  // Pega o último ciclo
  const lastCycle = pilarNotas[pilarNotas.length - 1];
  if (!lastCycle) return { name: "Nenhum", nota: 0 }; // Caso não haja ciclos

  // Pega as notas do último ciclo
  const Notas = lastCycle.notas.map((item: PilarNota) => ({
    name: item.pilarNome,
    nota: item.pilarNota || 0, // Garante que não haja valores nulos
  }));

  // Ordena por nota decrescente, depois por nome crescente
  Notas.sort((a, b) => {
    if (b.nota !== a.nota) return b.nota - a.nota;
    return a.name.localeCompare(b.name);
  });

  // Retorna o pilar com maior nota
  return { name: Notas[0].name, nota: Notas[0].nota };
}

export function ColaboradorEvolution() {
  const theme = useTheme();
  const location = useLocation();
  const { perfil } = useOutletContext<{ perfil: PerfilData }>();
  const { idColaborador, nome } = location.state || {};

  const colaboradorId = idColaborador || perfil?.userId;

  const navigate = useNavigate();
  const isGestorVisualizandoOutro = perfil?.userId !== colaboradorId;

  const { notasHistorico } = useColaboradorNotasHistorico(colaboradorId);
  const { pilarNotas } = useColaboradorPilarNotas(colaboradorId);
  const { countAvaliacoes } = useCountAvaliacoes(colaboradorId);

  const higherPilar = getHigherPilar(pilarNotas);
  const notas = notasHistorico.map((item) => item.cicloNota);

  const last = notas[notas.length - 1] || 0; // undefined se array vazio
  const before = notas[notas.length - 2] || 0; // undefined se < 2 itens

  const currentNote = last;
  const previousNote = before;
  const differNote = (currentNote - previousNote).toFixed(2);

  const [chartWidth, setChartWidth] = useState("300%");

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 1024;
      setChartWidth(isMobile ? "100%" : "300%");
    };

    handleResize(); // define no load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!colaboradorId) {
    return (
      <EmptyMessage
        icon={<MdAccountCircle size={32} />}
        title="Acesso restrito"
        description="Usuário não encontrado."
      />
    );
  }

  return (
    <>
      <S.Header>
        <Title>
          {" "}
          {isGestorVisualizandoOutro
            ? `Evolução do seu liderado: ${nome}`
            : "Sua evolução na RocketCorp"}
        </Title>
        {isGestorVisualizandoOutro && (
          <S.HeaderButtons>
            <Button variant="outline" onClick={() => navigate(-1)}>
              <MdArrowBack size={18} style={{ marginRight: 4 }} />
              Voltar
            </Button>
          </S.HeaderButtons>
        )}
      </S.Header>
      <CardConteiner>
        <CardBox
          title="Nota atual"
          bigSpan={currentNote.toString()}
          miniSpan={differNote.toString()}
          icon={<MdGrade />}
        />
        <CardBox
          title="Avaliações"
          bigSpan={
            countAvaliacoes.length > 1
              ? countAvaliacoes.toString()
              : "0" + countAvaliacoes
          }
          span="recebidas no total"
          icon={<FaFileAlt />}
        />
        <CardBox
          title="Pilar em destaque"
          bigSpan={higherPilar.name}
          span={`média de ${higherPilar.nota}`}
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
                data: notasHistorico.map((nota) => nota.cicloNota || 0), // Garante que não haja valores nulos
              },
            ]}
            options={{
              chart: {
                toolbar: { show: false },
                zoom: { enabled: false },
              },
              xaxis: {
                categories: notasHistorico.map((nota) => nota.cicloNome),
              },
              yaxis: {
                title: { text: "Nota" },
              },
              colors: [theme.colors.primary.default],
              dataLabels: { enabled: true },
            }}
          />
        </ChartBox>
        <ChartBox title="Última avaliação por pilar avaliativo">
          <ReactApexChart
            type="bar"
            height={300}
            width={400}
            series={[
              {
                name: "Nota",
                data:
                  pilarNotas[pilarNotas.length - 1]?.notas.map(
                    (item: PilarNota) => item.pilarNota || 0
                  ) || [],
              },
            ]}
            options={{
              chart: {
                toolbar: { show: false },
              },
              xaxis: {
                categories:
                  pilarNotas[pilarNotas.length - 1]?.notas.map(
                    (item: PilarNota) => item.pilarNome
                  ) || [],
              },
              yaxis: {
                min: 0,
                max: 5,
                tickAmount: 5,
              },
              plotOptions: {
                bar: {
                  distributed: true,
                },
              },
              colors: [
                theme.colors.chart.orange,
                theme.colors.chart.blue,
                theme.colors.chart.green,
              ],
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
        <ChartBox title="Evolução por pilar avaliativo">
          <ReactApexChart
            type="line"
            height="100%"
            width={chartWidth}
            series={(() => {
              const allPilarNames = Array.from(
                new Set(
                  pilarNotas.flatMap((ciclo) =>
                    ciclo.notas.map((nota: PilarNota) => nota.pilarNome)
                  )
                )
              );
              return allPilarNames.map((pilarName) => ({
                name: pilarName,
                data: pilarNotas.map((ciclo) => {
                  const notaObj = ciclo.notas.find(
                    (nota: PilarNota) => nota.pilarNome === pilarName
                  );
                  return notaObj ? notaObj.pilarNota || 0 : 0;
                }),
              }));
            })()}
            options={{
              chart: {
                toolbar: { show: false },
                zoom: { enabled: false },
              },
              xaxis: {
                categories: pilarNotas.map(
                  (ciclo: CicloPilarNotas) => ciclo.ciclo
                ),
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
    </>
  );
}
