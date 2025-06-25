import EvaluationFrame from "@/components/EvaluationFrame";
import CriteryBox from "@/components/CriteryBox";
import { Title } from "@/components/Title";
import { useForm, Controller } from "react-hook-form";
import RowProgressBox from "@/components/RowProgressBox";
import ButtonFrame from "@/components/ButtonFrame/index.tsx";
import { FaPaperPlane } from "react-icons/fa";
import Button from "@/components/Button/index.tsx";
import { useEffect, useRef, useState } from "react";
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

const LOCAL_STORAGE_KEY = "autoavaliacao-cache";

export function AutoEvaluationForm() {
  const { handleSubmit, control, getValues, watch, reset } = useForm();
  const [progress, setProgress] = useState(0);
  const [comportamentoPreenchido, setCompPreenchido] = useState(0);
  const [logisticaPreenchido, setLogPreenchido] = useState(0);
  const [camposComErro, setCamposComErro] = useState<string[]>([]);

  const totalComportamento = criteriosComportamento.length;
  const totalLogistica = criteriosLogistica.length;

  // Carregar dados salvos no localStorage
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        reset(data);
        calculateProgress(data);
      } catch (err) {
        console.error("Erro ao recuperar cache:", err);
      }
    }
  }, [reset]);

  // Salvar no localStorage sempre que mudar algo
  useEffect(() => {
    const subscription = watch((values) => {
      calculateProgress(values);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(values));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const calculateProgress = (values: any) => {
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

  const submitClickedRef = useRef(false);
  const onSubmit = () => {
    if (!submitClickedRef.current) return;

    submitClickedRef.current = false; // resetar depois do uso

    const values = getValues();
    const erros: string[] = [];

    const faltandoComportamento = criteriosComportamento.filter((c) => {
      const val = values[`comportamento_${c.id}`];
      const isEmpty = !(val?.nota > 0 && val?.justificativa.trim() !== "");
      if (isEmpty) {
        erros.push(`comportamento_${c.id}`);
        return isEmpty;
      }
    });

    const faltandoLogistica = criteriosLogistica.filter((c) => {
      const val = values[`logistica_${c.id}`];
      const isEmpty = !(val?.nota > 0 && val?.justificativa.trim() !== "");
      if (isEmpty) {
        erros.push(`logistica_${c.id}`);
        return isEmpty;
      }
    });

    setCamposComErro(erros);

    if (faltandoComportamento.length > 0 || faltandoLogistica.length > 0) {
      toast.error(
        "Preencha todos os critérios da sua autoavaliação antes de enviar."
      );
      return;
    }

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

    localStorage.removeItem(LOCAL_STORAGE_KEY);
    toast.success("Autoavaliação enviada com sucesso!");
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
                error={camposComErro.includes(`comportamento_${c.id}`)}
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
                error={camposComErro.includes(`logistica_${c.id}`)}
              />
            )}
          />
        ))}
      </EvaluationFrame>

      <ButtonFrame text="Para submeter sua autoavaliação, preencha todos os critérios.">
        <Button
          type="submit"
          onClick={() => {
            submitClickedRef.current = true;
          }}
        >
          <FaPaperPlane />
          Enviar
        </Button>
      </ButtonFrame>
    </form>
  );
}

export default AutoEvaluationForm;
