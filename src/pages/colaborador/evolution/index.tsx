import CardConteiner from "@/components/CardContainer/index.tsx";
import CardBox from "@/components/CardBox/index.tsx";
import { Title } from "@/components/Title/index.tsx";
import { MdGrade } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { IoMdTrophy } from "react-icons/io";
import ReactApexChart from "react-apexcharts";
import ChartBox from "@/components/ChartBox/index.tsx";
import { useTheme } from "styled-components";
import { notasPorPilarData, ciclosParticipados, historicoNotas } from "@/data/collaboratorEvolution.ts";

function getHigherPilar() {
  // Pega o último valor de cada pilar
  const pilarNotas = notasPorPilarData.map((item) => ({
    name: item.name,
    nota: item.data[item.data.length - 1],
  }));
  // Ordena por nota decrescente, depois por nome crescente
  pilarNotas.sort((a, b) => {
    if (b.nota !== a.nota) return b.nota - a.nota;
    return a.name.localeCompare(b.name);
  });
  // Retorna o pilar com maior nota
  return { name: pilarNotas[0].name, nota: pilarNotas[0].nota };
}

export function ColaboradorEvolution() {
  const theme = useTheme();

  const higherPilar = getHigherPilar();
  const currentNote = historicoNotas[historicoNotas.length - 1];
  const differNote = (currentNote - historicoNotas[historicoNotas.length - 2]).toFixed(1);

  return (
    <>
      <Title>Sua evolução na RocketCorp</Title>

          <CardConteiner>
            <CardBox
              title="Nota atual"
              bigSpan= {currentNote.toString()}
              miniSpan={differNote.toString()}
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
                    data: historicoNotas,
                  },
                ]}
                options={{
                  chart: {
                    toolbar: { show: false },
                    zoom: { enabled: false },
                  },
                  xaxis: {
                    categories: ciclosParticipados
                    ,
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
                type="radar"
                height={320}  
                width={500}
                series={[
                  {
                    name: "Nota",
                    data: notasPorPilarData.map((item) => item.data[item.data.length - 1]),
                  },
                ]}
                options={{
                  chart: {
                    toolbar: { show: false },
                  },
                  xaxis: {
                    categories: notasPorPilarData.map((item) => item.name)                      
                    ,
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
            <ChartBox title="Evolução por pilar avaliativo">
              <ReactApexChart
                type="line"
                height={280}
                width={900}
                series={notasPorPilarData}
                options={{
                  chart: {
                    toolbar: { show: false },
                    zoom: { enabled: false },
                  },
                  xaxis: {
                    categories: ciclosParticipados,
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
