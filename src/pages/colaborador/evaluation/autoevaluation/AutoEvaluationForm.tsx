import EvaluationFrame from "@/components/EvaluationFrame";
import CriteryBox from "@/components/CriteryBox";
import { Title } from "@/components/Title";
import { useForm, Controller } from "react-hook-form";
import RowProgressBox from "@/components/RowProgressBox";
import ButtonFrame from "@/components/ButtonFrame/index.tsx";
import { FaPaperPlane } from "react-icons/fa";
import Button from "@/components/Button/index.tsx";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const criteriosComportamento = [
  {
    id: "sentimento_dono",
    nome: "Sentimento de Dono",
    subtitle: "Demonstrou responsabilidade e comprometimento com os resultados",
  },
  {
    id: "colaboracao",
    nome: "Colaboração",
    subtitle: "Trabalhou bem em equipe e ajudou colegas",
  },
  {
    id: "iniciativa",
    nome: "Iniciativa",
    subtitle: "Tomou iniciativa para resolver problemas",
  },
];
const criteriosLogistica = [
  {
    id: "organizacao",
    nome: "Organização",
    subtitle: "Manteve processos organizados e eficientes",
  },
  {
    id: "pontualidade",
    nome: "Pontualidade",
    subtitle: "Cumpriu prazos e horários",
  },
  {
    id: "gestao_recursos",
    nome: "Gestão de Recursos",
    subtitle: "Utilizou recursos de forma responsável",
  },
];

export function AutoEvaluationForm() {
  const { handleSubmit, control, getValues, watch } = useForm();
  const [progress, setProgress] = useState(0);
  const [comportamentoPreenchido, setCompPreenchido] = useState(0);
  const [logisticaPreenchido, setLogPreenchido] = useState(0);

  const totalComportamento = criteriosComportamento.length;
  const totalLogistica = criteriosLogistica.length;

  const calculateProgress = () => {
    const values = getValues();

    const filled1 = criteriosComportamento.filter((c) => {
      const value = values[`comportamento_${c.id}`];
      return value?.nota > 0 && value?.justificativa.trim() !== "";
    }).length;

    const filled2 = criteriosLogistica.filter((c) => {
      const value = values[`logistica_${c.id}`];
      return value?.nota > 0 && value?.justificativa.trim() !== "";
    }).length;

    const filledTotal = filled1 + filled2;
    const total = totalComportamento + totalLogistica;

    setProgress(Number((filledTotal / total).toPrecision(2)) * 100);
    setCompPreenchido(filled1);
    setLogPreenchido(filled2);
  };

  useEffect(() => {
    const subscription = watch(() => {
      calculateProgress();
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = () => {
    const values = getValues();
    const data = {
      Comportamento: {
        nomePilar: "Comportamento",
        criterios: criteriosComportamento.map((c) => ({
          id: c.id,
          nome: c.nome,
          nota: values[`comportamento_${c.id}`]?.nota || "",
          justificativa: values[`comportamento_${c.id}`]?.justificativa || "",
        })),
      },
      Logistica: {
        nomePilar: "Logística",
        criterios: criteriosLogistica.map((c) => ({
          id: c.id,
          nome: c.nome,
          nota: values[`logistica_${c.id}`]?.nota || "",
          justificativa: values[`logistica_${c.id}`]?.justificativa || "",
        })),
      },
    };
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RowProgressBox
        title="Progresso da Avaliação"
        bars={[{ subtitle: "Preenchimento", value: progress }]}
      />
      <Title>Sua autoavaliação</Title>

      <EvaluationFrame
        title="Comportamento"
        count={`${comportamentoPreenchido}/${totalComportamento}`}
      >
        {criteriosComportamento.map((c) => (
          <Controller
            key={c.id}
            name={`comportamento_${c.id}`}
            control={control}
            defaultValue={{ nota: 0, justificativa: "" }}
            render={({ field }) => (
              <CriteryBox
                title={c.nome}
                subtitle={c.subtitle}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        ))}
      </EvaluationFrame>

      <EvaluationFrame
        title="Logística"
        count={`${logisticaPreenchido}/${totalLogistica}`}
      >
        {criteriosLogistica.map((c) => (
          <Controller
            key={c.id}
            name={`logistica_${c.id}`}
            control={control}
            defaultValue={{ nota: 0, justificativa: "" }}
            render={({ field }) => (
              <CriteryBox
                title={c.nome}
                subtitle={c.subtitle}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        ))}
      </EvaluationFrame>

      <ButtonFrame text="Para submeter sua autoavaliação, preencha todos os critérios.">
        <Button onClick={handleSubmit(onSubmit)}>
          <FaPaperPlane />
          Enviar
        </Button>
      </ButtonFrame>
    </form>
  );
}

export default AutoEvaluationForm;
