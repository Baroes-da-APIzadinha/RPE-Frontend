import { useEffect, useMemo, useRef, useState } from "react";
import * as S from "./styles";
import { Title } from "@/components/Title";
import { Card } from "@/components/Card";
import TextArea from "@/components/Textarea";
import { StarRating } from "@/components/StarRating";
import {
  MdArrowBack,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdWarning,
} from "react-icons/md";
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
import { LoadingMessage } from "@/components/LoadingMessage";
import { FaPaperPlane } from "react-icons/fa";
import { Modal } from "@/components/Modal";

export function CollaboratorReview() {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    idColaborador,
    idAvaliacaoLider,
    nome,
    cardsPreenchidos,
    statusAvaliacaoLider,
  } = location.state || {};

  const [isReadonly, setIsReadonly] = useState(false);
  const [open, setOpen] = useState<string[]>([]);
  const [avaliacaoGestor, setAvaliacaoGestor] = useState<
    Record<string, { nota: number; justificativa: string }>
  >({});

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

  useEffect(() => {
    if (!criteriosPorPilar) return;

    const todosCriterios = Object.values(criteriosPorPilar).flat();

    const initialState = todosCriterios.reduce((acc, criterio) => {
      const preenchido = cardsPreenchidos?.find(
        (c: { nomeCriterio: string; nota: string; justificativa: string }) =>
          c.nomeCriterio === criterio.nomeCriterio
      );
      acc[criterio.nomeCriterio] = {
        nota: preenchido ? Number(preenchido.nota) : 0,
        justificativa: preenchido?.justificativa || "",
      };
      return acc;
    }, {} as Record<string, { nota: number; justificativa: string }>);

    setAvaliacaoGestor(initialState);
    setOpen([todosCriterios[0]?.nomeCriterio]);
  }, [criteriosPorPilar]);

  useEffect(() => {
    if (statusAvaliacaoLider === "CONCLUIDA") {
      setIsReadonly(true);
    }
  }, [statusAvaliacaoLider]);

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

  const autosaveInterval = useRef<NodeJS.Timeout | null>(null);

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
      setConfirmModalOpen(false);
    } catch {
      toast.error("Erro ao enviar avaliação.");
    }

    if (autosaveInterval.current) {
      clearInterval(autosaveInterval.current);
    }
  };

  useEffect(() => {
    if (!idAvaliacaoLider || !criteriosPorPilar || isReadonly) return;

    autosaveInterval.current = setInterval(() => {
      const criterios = Object.entries(avaliacaoGestor).map(
        ([nome, { nota, justificativa }]) => ({
          nome,
          nota,
          justificativa: justificativa.trim(),
        })
      );

      if (criterios.length === 0) return;

      preencherRascunhoLider({
        idAvaliacao: idAvaliacaoLider,
        criterios,
      });
    }, 10000); // 10s

    return () => {
      if (autosaveInterval.current) {
        clearInterval(autosaveInterval.current);
      }
    };
  }, [idAvaliacaoLider, criteriosPorPilar, isReadonly, avaliacaoGestor]);

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
    return <LoadingMessage message="Carregando dados..." />;
  }

  return (
    <>
      <S.Header>
        <Title>Revisão de notas: {nome}</Title>
        <S.HeaderButtons>
          <Button variant="outline" onClick={() => navigate(-1)}>
            {" "}
            <MdArrowBack /> Voltar{" "}
          </Button>
        </S.HeaderButtons>
      </S.Header>
      <RowProgressBox
        title="Progresso da revisão"
        bars={[
          {
            subtitle: "Progresso da Revisão",
            value: Math.round((criteriosPreenchidos / totalCriterios) * 100),
          },
        ]}
      />

      {Object.entries(criteriosPorPilar).map(([pilar, criterios]) => (
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
                          {(autoMap[criterio.nomeCriterio]?.nota ?? 0).toFixed(
                            1
                          )}
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
                        onChange={(nota) =>
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

      <ButtonFrame text="Esta avaliação é salva automaticamente a cada 10 segundos. Uma vez enviada a avaliação ela não pode mais ser alterada.">
        <Button onClick={() => setConfirmModalOpen(true)} disabled={isReadonly}>
          <FaPaperPlane /> Concluir e enviar
        </Button>
      </ButtonFrame>

      <Modal
        open={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        title="Confirmar envio"
        description="Essa ação é irreversível e não poderá ser desfeita."
        icon={<MdWarning />}
        iconColor="warning"
        iconSize="large"
      >
        <S.ModalContent>
          <S.ModalDescription>
            Tem certeza que deseja enviar sua avaliação do liderado {nome}? Após
            o envio, você não poderá alterá-la.
          </S.ModalDescription>
        </S.ModalContent>

        <S.ModalActions>
          <Button variant="outline" onClick={() => setConfirmModalOpen(false)}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Confirmar envio
          </Button>
        </S.ModalActions>
      </Modal>
    </>
  );
}
