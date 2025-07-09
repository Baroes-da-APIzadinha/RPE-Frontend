import EvaluationFrame from "@/components/EvaluationFrame";
import CriteryBox from "@/components/CriteryBox";
import { Title } from "@/components/Title";
import RowProgressBox from "@/components/RowProgressBox";
import ButtonFrame from "@/components/ButtonFrame";
import Button from "@/components/Button";
import { FaPaperPlane } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useOutletContext } from "react-router-dom";

import { useAutoAvaliacaoId } from "@/hooks/avaliacoes/useAutoAvaliacaoId";
import { useCriteriosAutoAvaliacao } from "@/hooks/avaliacoes/useCriteriosAutoAvaliacao";
import type { PerfilData } from "@/types/PerfilData";
import { preencherAutoAvaliacao } from "@/services/HTTP/avaliacoes";

export function AutoEvaluationForm() {
  const { perfil } = useOutletContext<{ perfil: PerfilData }>();
  const {
    idAvaliacao,
    respostas,
    loading: loadingId,
  } = useAutoAvaliacaoId(perfil.userId);
  const { criterios, loading: loadingCriterios } = useCriteriosAutoAvaliacao( idAvaliacao ?? undefined );
  const { handleSubmit, control, getValues, watch, reset } = useForm();
  const [progress, setProgress] = useState(0);
  const [camposComErro, setCamposComErro] = useState<string[]>([]);
  const submitClickedRef = useRef(false);
  const modoVisualizacao = !!respostas?.length;


  useEffect(() => {
    if (!criterios || !respostas) return;

    const valoresIniciais: Record<
      string,
      { nota: number; justificativa: string }
    > = {};

    for (const pilar in criterios) {
      criterios[pilar].forEach((c) => {
        const resposta = respostas?.find(
          (r) => r.nomeCriterio === c.nomeCriterio
        );
        const key = `${c.nomeCriterio}`;
        valoresIniciais[key] = {
          nota: resposta ? Number(resposta.nota) : 0,
          justificativa: resposta?.justificativa || "",
        };
      });
    }

    reset(valoresIniciais);
    calculateProgress(valoresIniciais);
  }, [criterios, respostas, reset]);

  const watchedValues = useWatch({ control });
  useEffect(() => {
    calculateProgress(watchedValues);
  }, [watchedValues, criterios]);

  const calculateProgress = (values: any) => {
    let preenchidos = 0;
    let total = 0;

    for (const pilar in criterios) {
      criterios[pilar].forEach((c) => {
        const key = `${c.nomeCriterio}`;
        const val = values[key];
        if (val?.nota > 0 && val?.justificativa.trim()) preenchidos++;
        total++;
      });
    }

    setProgress(
      total === 0 ? 0 : Number((preenchidos / total).toPrecision(2)) * 100
    );
  };

  const onSubmit = async () => {
    if (!submitClickedRef.current) return;
    submitClickedRef.current = false;

    const values = getValues();
    const erros: string[] = [];

    const criteriosPayload: {
      nome: string;
      nota: number;
      justificativa: string;
    }[] = [];

    for (const pilar in criterios) {
      criterios[pilar].forEach((criterio) => {
        const nome = criterio.nomeCriterio;
        const val = values[nome];

        const isFilled = val?.nota > 0 && val?.justificativa?.trim() !== "";

        if (!isFilled) {
          erros.push(nome);
        } else {
          criteriosPayload.push({
            nome,
            nota: Number(val.nota),
            justificativa: val.justificativa.trim(),
          });
        }
      });
    }

    setCamposComErro(erros);

    if (erros.length > 0) {
      toast.error(
        "Preencha todos os critérios da sua autoavaliação antes de enviar."
      );
      return;
    }

    if (!idAvaliacao) {
      toast.error("ID da avaliação não encontrado.");
      return;
    }

    try {
      await preencherAutoAvaliacao({
        idAvaliacao,
        criterios: criteriosPayload,
      });

      toast.success("Autoavaliação enviada com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar sua autoavaliação.");
    }
  };

  if (loadingId || loadingCriterios) return <p>Carregando...</p>;
  if (!idAvaliacao || Object.keys(criterios).length === 0)
    return <p>Avaliação não encontrada.</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RowProgressBox
        title="Progresso da Avaliação"
        bars={[{ subtitle: "Preenchimento", value: progress }]}
      />
      <Title>Sua autoavaliação</Title>

      {Object.entries(criterios).map(([pilar, lista]) => (
        <EvaluationFrame
          key={pilar}
          title={pilar}
          count={`${
            lista.filter((c) => {
              const key = `${c.nomeCriterio}`;
              const val = getValues(key);
              return val?.nota > 0 && val?.justificativa.trim();
            }).length
          }/${lista.length}`}
        >
          {lista.map((criterio) => {
            const fieldName = `${criterio.nomeCriterio}`;
            return (
              <Controller
                key={fieldName}
                name={fieldName}
                control={control}
                defaultValue={{ nota: 0, justificativa: "" }}
                render={({ field }) => (
                  <CriteryBox
                    title={criterio.nomeCriterio}
                    subtitle={criterio.descricao}
                    value={field.value}
                    onChange={field.onChange}
                    error={camposComErro.includes(fieldName)}
                  />
                )}
              />
            );
          })}
        </EvaluationFrame>
      ))}

      <ButtonFrame text="Para submeter sua autoavaliação, preencha todos os critérios.">
        <Button
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
