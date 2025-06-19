import * as S from "../styles.ts";
import EvaluationFrame from "@/components/EvaluationFrame";
import CriteryBox from "@/components/CriteryBox";
import { Title } from "@/components/Title";
import { useForm, Controller } from "react-hook-form";

const criteriosComportamento = [
  { id: "sentimento_dono", nome: "Sentimento de Dono", subtitle: "Demonstrou responsabilidade e comprometimento com os resultados" },
  { id: "colaboracao", nome: "Colaboração", subtitle: "Trabalhou bem em equipe e ajudou colegas" },
  { id: "iniciativa", nome: "Iniciativa", subtitle: "Tomou iniciativa para resolver problemas" },
];
const criteriosLogistica = [
  { id: "organizacao", nome: "Organização", subtitle: "Manteve processos organizados e eficientes" },
  { id: "pontualidade", nome: "Pontualidade", subtitle: "Cumpriu prazos e horários" },
  { id: "gestao_recursos", nome: "Gestão de Recursos", subtitle: "Utilizou recursos de forma responsável" },
];

export function AutoEvaluationForm() {
  const { handleSubmit, control, getValues } = useForm();

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
      <Title>Sua autoavaliação</Title>
      <EvaluationFrame title="Comportamento">
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
      <EvaluationFrame title="Logística">
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
      <S.SubmitButton type="submit">Enviar</S.SubmitButton>
    </form>
  );
}

export default AutoEvaluationForm;
