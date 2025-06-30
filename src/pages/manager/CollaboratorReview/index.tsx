import { useState } from "react";
import * as S from "./styles";
import { Sidebar } from "@/components/Sidebar";
import { Title } from "@/components/Title";
import { Card } from "@/components/Card";
import TextArea from "@/components/Textarea";
import { StarRating } from "@/components/StarRating";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import EvaluationFrame from "@/components/EvaluationFrame";
import RowProgressBox from "@/components/RowProgressBox";

const criteriosMock = [
  {
    id: "1",
    nome: "Sentimento de dono",
    nota: 4,
    justificativa: "Demonstrei responsabilidade e comprometimento.",
  },
  {
    id: "2",
    nome: "Resiliência nas adversidades",
    nota: 3.5,
    justificativa: "Mostrei resiliência em situações difíceis.",
  },
  {
    id: "3",
    nome: "Organização no trabalho",
    nota: null,
    justificativa: "",
  },
  {
    id: "4",
    nome: "Capacidade de aprender",
    nota: null,
    justificativa: "",
  },
  {
    id: "5",
    nome: "Ser 'team player'",
    nota: null,
    justificativa: "",
  },
];

const autoavaliacaoMock = [
  {
    id: "1",
    nome: "Sentimento de dono",
    nota: 4,
    justificativa: "Demonstrei responsabilidade e comprometimento.",
  },
  {
    id: "2",
    nome: "Resiliência nas adversidades",
    nota: 3.5,
    justificativa: "Mostrei resiliência em situações difíceis.",
  },
  {
    id: "3",
    nome: "Organização no trabalho",
    nota: 3,
    justificativa: "Organizei bem minhas tarefas.",
  },
  {
    id: "4",
    nome: "Capacidade de aprender",
    nota: 4,
    justificativa: "Aprendi novas ferramentas rapidamente.",
  },
  {
    id: "5",
    nome: "Ser 'team player'",
    nota: 5,
    justificativa: "Colaborei com todos da equipe.",
  },
];

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
  const { perfil, loading } = usePerfil();

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
    console.log("Avaliação enviada:");
  };

  const handleGestorNotaChange = (id: string, nota: number) => {
    setAvaliacaoGestor((prev) => ({
      ...prev,
      [id]: { ...prev[id], nota },
    }));
  };

  const handleGestorJustificativaChange = (id: string, justificativa: string) => {
    setAvaliacaoGestor((prev) => ({
      ...prev,
      [id]: { ...prev[id], justificativa },
    }));
  };

  if (loading || !perfil) return null;


  return (
    <S.Wrapper>
      <Sidebar
        roles={perfil.roles}
        mainRole={perfil.mainRole}
        userName={perfil.userName}
      />
      <S.Main>
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
      </S.Main>
    </S.Wrapper>
  );
}
