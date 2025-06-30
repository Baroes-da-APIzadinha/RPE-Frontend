import { useState } from "react";
import * as S from "./styles";
import { Title } from "@/components/Title";
import { Card } from "@/components/Card";
import TextArea from "@/components/Textarea";
import { StarRating } from "@/components/StarRating";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import EvaluationFrame from "@/components/EvaluationFrame";
import RowProgressBox from "@/components/RowProgressBox";
import { toast } from "sonner";
import { criteriosMock, autoavaliacaoMock } from "@/data/collaboratorReview";

// Agrupamento dos critérios por pilar
const criteriosPorPilar = [
  {
    titulo: "Postura",
    criterios: criteriosMock.filter((c) => ["1", "2"].includes(c.id)),
    autoavaliacao: autoavaliacaoMock.filter((c) => ["1", "2"].includes(c.id)),
  },
  {
    titulo: "Logistica",
    criterios: criteriosMock.filter((c) => ["3", "4"].includes(c.id)),
    autoavaliacao: autoavaliacaoMock.filter((c) => ["3", "4"].includes(c.id)),
  },
  {
    titulo: "Gestão e Liderança",
    criterios: criteriosMock.filter((c) => ["5"].includes(c.id)),
    autoavaliacao: autoavaliacaoMock.filter((c) => ["5"].includes(c.id)),
  },
];

export function CollaboratorReview() {
  const [open, setOpen] = useState<string[]>([criteriosMock[0].id]);

  // Estado para avaliações do gestor, inicializando vazio para cada critério
  const [avaliacaoGestor, setAvaliacaoGestor] = useState(() =>
    criteriosMock.reduce((acc, criterio) => {
      acc[criterio.id] = { nota: 0, justificativa: "" };
      return acc;
    }, {} as Record<string, { nota: number; justificativa: string }>)
  );

  const totalCriterios = criteriosMock.length;
  const criteriosPreenchidos = Object.values(avaliacaoGestor).filter(
    (a) => a.nota > 0 && a.justificativa.trim() !== ""
  ).length;

  const handleAccordion = (id: string) => {
    setOpen((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (criteriosPreenchidos < totalCriterios) {
      toast.error("Preencha todos os critérios antes de enviar.");
      return;
    }
    toast.success("Avaliação enviada com sucesso!");
    console.log("Avaliação enviada:", avaliacaoGestor);
  };

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

  return (
    <>
      <>
        <Title>Revisão de notas: Aryelly serafim</Title>
        <RowProgressBox
          title="Progresso da revisão"
          bars={[
            {
              subtitle: "Progresso da Revisão",
              value: Math.round((criteriosPreenchidos / totalCriterios) * 100),
            },
          ]}
        />

        {criteriosPorPilar.map((pilar) => (
          <EvaluationFrame key={pilar.titulo} title={pilar.titulo}>
            {pilar.criterios.map((criterio) => {
              const isOpen = open.includes(criterio.id);
              return (
                <Card key={criterio.id}>
                  <S.CriterioHeader>
                    <S.SectionTitle>{criterio.nome}</S.SectionTitle>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <S.NotaBadge $visible={!isOpen}>
                        {(
                          pilar.autoavaliacao.find((a) => a.id === criterio.id)
                            ?.nota ?? 0
                        ).toFixed(1)}
                      </S.NotaBadge>
                      <S.NotaBadge $visible={!isOpen}>
                        {(avaliacaoGestor[criterio.id]?.nota ?? 0).toFixed(1)}
                      </S.NotaBadge>
                      <S.ToggleIcon
                        $open={isOpen}
                        onClick={() => handleAccordion(criterio.id)}
                        tabIndex={0}
                        role="button"
                        aria-label={
                          isOpen ? "Fechar critério" : "Abrir critério"
                        }
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
                      {/* Colaborador */}
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
                              pilar.autoavaliacao.find(
                                (a) => a.id === criterio.id
                              )?.nota ?? 0
                            ).toFixed(1)}
                          </S.NotaBadge>
                        </div>
                        <StarRating
                          value={
                            pilar.autoavaliacao.find(
                              (a) => a.id === criterio.id
                            )?.nota ?? 0
                          }
                          readOnly
                        />
                        <TextArea
                          value={
                            pilar.autoavaliacao.find(
                              (a) => a.id === criterio.id
                            )?.justificativa || ""
                          }
                          readOnly
                          placeholder="Justificativa do colaborador"
                          rows={4}
                        />
                      </S.CriteriaSection>
                      {/* Gestor */}
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
                            {(avaliacaoGestor[criterio.id]?.nota ?? 0).toFixed(
                              1
                            )}
                          </S.NotaBadge>
                        </div>
                        <StarRating
                          value={avaliacaoGestor[criterio.id]?.nota ?? 0}
                          onChange={(nota: number) =>
                            handleGestorNotaChange(criterio.id, nota)
                          }
                        />
                        <TextArea
                          value={
                            avaliacaoGestor[criterio.id]?.justificativa || ""
                          }
                          onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                          ) =>
                            handleGestorJustificativaChange(
                              criterio.id,
                              e.target.value
                            )
                          }
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
        <S.Button onClick={handleSubmit}>Concluir e enviar</S.Button>
      </>
    </>
  );
}
