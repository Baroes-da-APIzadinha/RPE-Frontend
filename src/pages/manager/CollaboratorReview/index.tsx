import { useEffect, useMemo, useState } from "react";
import * as S from "./styles";
import { Title } from "@/components/Title";
import { Card } from "@/components/Card";
import TextArea from "@/components/Textarea";
import { StarRating } from "@/components/StarRating";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import EvaluationFrame from "@/components/EvaluationFrame";
import RowProgressBox from "@/components/RowProgressBox";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAutoAvaliacaoByUserId,
  getFormLiderColaborador,
  preencherAvaliacaoLider,
  preencherRascunhoLider,
} from "@/services/HTTP/avaliacoes";
import { useQuery } from "@tanstack/react-query";
import type { FormularioLiderColaborador } from "@/types/AvaliacaoLider";
import ButtonFrame from "@/components/ButtonFrame";
import Button from "@/components/Button";

export function CollaboratorReview() {
  const navigate = useNavigate();
  const location = useLocation();
  const { idColaborador, idAvaliacaoLider, nome } = location.state || {};
  const [isReadonly, setIsReadonly] = useState(false);

  const [open, setOpen] = useState<string[]>([]);
  const [avaliacaoGestor, setAvaliacaoGestor] = useState<
    Record<string, { nota: number; justificativa: string }>
  >({});

  // Validação básica:
  useEffect(() => {
    if (!idAvaliacaoLider) {
      toast.error("Avaliação inválida.");
      navigate("/gestor/minha-equipe");
    }
  }, []);

  const { data: criteriosPorPilar, isLoading } =
    useQuery<FormularioLiderColaborador>({
      queryKey: ["form-lider-colaborador", idAvaliacaoLider],
      queryFn: () => getFormLiderColaborador(idAvaliacaoLider),
      enabled: !!idAvaliacaoLider,
    });

  const { data: autoavaliacao } = useQuery({
    queryKey: ["autoavaliacao", idColaborador],
    queryFn: () => getAutoAvaliacaoByUserId(idColaborador),
    enabled: !!idColaborador,
  });

  // console.log("autoavaliacao:", autoavaliacao);

  useEffect(() => {
    if (!criteriosPorPilar) return;

    const todosCriterios = Object.values(criteriosPorPilar).flat();

    const initialState = todosCriterios.reduce((acc, criterio) => {
      acc[criterio.nomeCriterio] = { nota: 0, justificativa: "" };
      return acc;
    }, {} as Record<string, { nota: number; justificativa: string }>);

    setAvaliacaoGestor(initialState);
    setOpen([todosCriterios[0]?.nomeCriterio]); // abre o primeiro
  }, [criteriosPorPilar]);

  useEffect(() => {
    if (location.state?.statusAvaliacaoLider === "CONCLUIDA") {
      setIsReadonly(true);
    }
  }, []);

  const totalCriterios = Object.values(criteriosPorPilar || {}).flat().length;

  const criteriosPreenchidos = Object.values(avaliacaoGestor).filter(
    (a) => a.nota > 0 && a.justificativa.trim() !== ""
  ).length;

  const autoMap = useMemo(() => {
    const map: Record<string, { nota: number; justificativa: string }> = {};

    const cards =
      autoavaliacao?.avaliacoes?.[0]?.autoAvaliacao?.cardAutoAvaliacoes;

    if (Array.isArray(cards)) {
      cards.forEach((card: any) => {
        map[card.nomeCriterio] = {
          nota: Number(card.nota) ?? 0,
          justificativa: card.justificativa ?? "",
        };
      });
    }

    return map;
  }, [autoavaliacao]);

  const handleAccordion = (id: string) => {
    setOpen((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (criteriosPreenchidos < totalCriterios) {
      toast.error("Preencha todos os critérios antes de enviar.");
      return;
    }

    try {
      const criterios = Object.entries(avaliacaoGestor).map(
        ([nome, { nota, justificativa }]) => ({
          nome,
          nota,
          justificativa,
        })
      );

      await preencherAvaliacaoLider({
        idAvaliacao: idAvaliacaoLider,
        criterios,
      });

      toast.success("Avaliação enviada com sucesso!");
      setIsReadonly(true);
    } catch (err) {
      toast.error("Erro ao enviar avaliação.");
    }
  };

  const handleAutoSave = async () => {
    if (isReadonly) return;

    try {
      const criterios = Object.entries(avaliacaoGestor).map(
        ([nome, { nota, justificativa }]) => ({
          nome,
          nota,
          justificativa,
        })
      );

      await preencherRascunhoLider({
        idAvaliacao: idAvaliacaoLider,
        criterios,
      });

      toast.success("Rascunho salvo com sucesso");
    } catch (error) {
      toast.error("Erro ao salvar rascunho");
    }
  };

  useEffect(() => {
    const handleUnload = (event: BeforeUnloadEvent) => {
      handleAutoSave();
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [avaliacaoGestor]);

  const handleGestorNotaChange = (id: string, nota: number) => {
    setAvaliacaoGestor((prev) => ({
      ...prev,
      [id]: { ...prev[id], nota },
    }));
  };

  const handleGestorJustificativaChange = (
    id: string,
    justificativa: string
  ) => {
    setAvaliacaoGestor((prev) => ({
      ...prev,
      [id]: { ...prev[id], justificativa },
    }));
  };

  if (isLoading || !criteriosPorPilar) {
    return <p>Carregando critérios...</p>;
  }

  return (
    <>
      <>
        <Title>Revisão de notas:{nome}</Title>
        <RowProgressBox
          title="Progresso da revisão"
          bars={[
            {
              subtitle: "Progresso da Revisão",
              value: Math.round((criteriosPreenchidos / totalCriterios) * 100),
            },
          ]}
        />

        {Object.entries(criteriosPorPilar || {}).map(([pilar, criterios]) => (
          <EvaluationFrame key={pilar} title={pilar}>
            {criterios.map((criterio) => {
              const isOpen = open.includes(criterio.nomeCriterio);
              return (
                <Card key={criterio.nomeCriterio}>
                  <S.CriterioHeader>
                    <S.SectionTitle>{criterio.nomeCriterio}</S.SectionTitle>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <S.NotaBadge $visible={!isOpen}>
                        {(autoMap[criterio.nomeCriterio]?.nota ?? 0).toFixed(1)}
                      </S.NotaBadge>
                      <S.NotaBadge $visible={!isOpen}>
                        {(
                          avaliacaoGestor[criterio.nomeCriterio]?.nota ?? 0
                        ).toFixed(1)}
                      </S.NotaBadge>
                      <S.ToggleIcon
                        $open={isOpen}
                        onClick={() => handleAccordion(criterio.nomeCriterio)}
                      >
                        {isOpen ? (
                          <MdKeyboardArrowUp size={36} />
                        ) : (
                          <MdKeyboardArrowDown size={36} />
                        )}
                      </S.ToggleIcon>
                    </div>
                  </S.CriterioHeader>

                  {isOpen && (
                    <S.CriteriaContent>
                      <S.CriteriaSection>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <S.Subtitle>Avaliação do colaborador</S.Subtitle>
                          <S.NotaBadge style={{ marginLeft: "auto" }}>
                            {(
                              autoMap[criterio.nomeCriterio]?.nota ?? 0
                            ).toFixed(1)}
                          </S.NotaBadge>
                        </div>
                        <StarRating
                          value={autoMap[criterio.nomeCriterio]?.nota ?? 0}
                          readOnly
                        />
                        <TextArea
                          value={
                            autoMap[criterio.nomeCriterio]?.justificativa ?? ""
                          }
                          readOnly
                          placeholder="Justificativa do colaborador"
                          rows={4}
                        />
                      </S.CriteriaSection>

                      <S.CriteriaSection>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <S.Subtitle>Sua avaliação</S.Subtitle>
                          <S.NotaBadge style={{ marginLeft: "auto" }}>
                            {(
                              avaliacaoGestor[criterio.nomeCriterio]?.nota ?? 0
                            ).toFixed(1)}
                          </S.NotaBadge>
                        </div>
                        <StarRating
                          value={
                            avaliacaoGestor[criterio.nomeCriterio]?.nota ?? 0
                          }
                          onChange={(nota: number) =>
                            handleGestorNotaChange(criterio.nomeCriterio, nota)
                          }
                          readOnly={isReadonly}
                        />
                        <TextArea
                          value={
                            avaliacaoGestor[criterio.nomeCriterio]
                              ?.justificativa || ""
                          }
                          onChange={(e) =>
                            handleGestorJustificativaChange(
                              criterio.nomeCriterio,
                              e.target.value
                            )
                          }
                          disabled={isReadonly}
                          placeholder="Justifique sua nota"
                          rows={4}
                        />
                      </S.CriteriaSection>
                    </S.CriteriaContent>
                  )}
                </Card>
              );
            })}
          </EvaluationFrame>
        ))}

        <ButtonFrame>
          <Button onClick={handleSubmit} disabled={isReadonly}>
            Concluir e enviar
          </Button>
        </ButtonFrame>
      </>
    </>
  );
}
