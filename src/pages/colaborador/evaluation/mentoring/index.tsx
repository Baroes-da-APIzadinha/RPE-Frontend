import * as S from "./styles.ts";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/Card";
import Button from "@/components/Button";
import ButtonFrame from "@/components/ButtonFrame";
import { MdAccountCircle, MdWarning } from "react-icons/md";
import { FaPaperPlane } from "react-icons/fa";
import { StarRating } from "@/components/StarRating";
import { useAvaliacaoMentor } from "@/hooks/avaliacoes/useAvaliacaoMentor";
import { useColaboradorById } from "@/hooks/colaboradores/useColaboradorById";
import { useOutletContext } from "react-router-dom";
import { toast } from "sonner";
import type { PerfilData } from "@/types/PerfilData.tsx";
import { preencherAvaliacaoMentor } from "@/services/HTTP/avaliacoes";
import { formatar } from "@/utils/formatters.ts";
import { LoadingMessage } from "@/components/LoadingMessage/index.tsx";
import { EmptyMessage } from "@/components/EmptyMensage/index.tsx";
import { Modal } from "@/components/Modal/index.tsx";

export function MentoringPage() {
  const { perfil } = useOutletContext<{ perfil: PerfilData }>();
  const [modalOpen, setModalOpen] = useState(false);
  const { avaliacao, loading } = useAvaliacaoMentor(perfil.userId);
  const [nota, setNota] = useState(0);
  const [justificativa, setJustificativa] = useState("");
  const [errors, setErrors] = useState({
    nota: false,
    justificativa: false,
  });
  const isReadonly = avaliacao?.status === "CONCLUIDA";

  // SE JA FOI AVALIADO
  useEffect(() => {
    if (avaliacao?.avaliacaoColaboradorMentor) {
      const mentor = avaliacao.avaliacaoColaboradorMentor;
      setNota(mentor.nota);
      setJustificativa(mentor.justificativa);
    }
  }, [avaliacao]);

  const { colaborador: mentor, loading: loadingMentor } = useColaboradorById(
    avaliacao?.idAvaliado ?? ""
  );

  const montarPayload = (status: "EM_RASCUNHO" | "CONCLUIDA") => {
    const payload: any = {
      idAvaliacao: avaliacao?.idAvaliacao ?? "",
      status,
    };

    if (typeof nota === "number" && nota > 0) {
      payload.nota = nota;
    }

    if (justificativa.trim()) {
      payload.justificativa = justificativa.trim();
    }

    return payload;
  };

  // AUTO SAVE
  useEffect(() => {
    if (!avaliacao?.idAvaliacao || isReadonly) return;

    const interval = setInterval(() => {
      const temConteudo = nota > 0 || justificativa.trim() !== "";
      if (!temConteudo) return;

      console.log(
        "Payload enviado:",
        JSON.stringify(montarPayload("EM_RASCUNHO"))
      );
      preencherAvaliacaoMentor(montarPayload("EM_RASCUNHO"))
        .then(() => console.log("Auto save mentor executado"))
        .catch((err) => console.warn("Erro no autosave mentor:", err));
    }, 10000); // a cada 10s

    return () => clearInterval(interval);
  }, [nota, justificativa, avaliacao?.idAvaliacao, isReadonly]);


  const handleSubmit = async () => {
    const hasError = nota === 0 || justificativa.trim() === "";

    if (hasError) {
      setErrors({
        nota: nota === 0,
        justificativa: justificativa.trim() === "",
      });
      setModalOpen(false);
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    if (!avaliacao?.idAvaliacao) return;

    try {
      await preencherAvaliacaoMentor(montarPayload("CONCLUIDA"));
      toast.success("Avaliação enviada com sucesso!");
      window.location.reload();
    } catch (err) {
      console.error("Erro ao enviar avaliação:", err);
      toast.error("Erro ao enviar a avaliação.");
    }
  };

  if (
    loading ||
    loadingMentor ||
    avaliacao?.avaliacaoColaboradorMentor == null
  ) {
    return <LoadingMessage message="Carregando avaliação do mentor..." />;
  }

  if (!avaliacao) {
    return (
      <EmptyMessage
        icon={<MdAccountCircle size={32} />}
        title="Nenhuma avaliação de mentor encontrada"
        description="Verifique com sua liderança se você foi incluído no ciclo atual."
      />
    );
  }

  return (
    <S.Container>
      <S.HeaderCard>
        <MdAccountCircle size={64} />
        <S.ColabInfo>
          <S.ColabNome>
            Mentor:{" "}
            <strong>{mentor?.nomeCompleto || "Nome indisponível"}</strong>
          </S.ColabNome>
          <S.ColabCargo>
            Cargo: {formatar(mentor?.cargo as string) || "Cargo não informado"}
          </S.ColabCargo>
        </S.ColabInfo>
      </S.HeaderCard>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Card>
          <S.FormBlock>
            <S.Label>Nota para o Mentor</S.Label>
            <S.StarsGroup>
              <StarRating
                value={nota}
                onChange={(star) => {
                  setNota(star);
                  setErrors((prev) => ({ ...prev, nota: false }));
                }}
                readOnly={isReadonly}
              />
              <S.Score>{nota}</S.Score>
            </S.StarsGroup>
          </S.FormBlock>
          <S.FormBlock>
            <S.Label>Justificativa</S.Label>
            <S.TextArea
              placeholder="Escreva sua avaliação sobre o mentor..."
              value={justificativa}
              onChange={(e) => {
                setJustificativa(e.target.value);
                setErrors((prev) => ({ ...prev, justificativa: false }));
              }}
              disabled={isReadonly}
              error={errors.justificativa}
            />
          </S.FormBlock>
        </Card>

        <ButtonFrame text="Para submeter sua avaliação, preencha os campos obrigatórios.">
          <Button
            disabled={isReadonly}
            type="button"
            onClick={() => setModalOpen(true)}
          >
            <FaPaperPlane /> Enviar
          </Button>
        </ButtonFrame>
      </form>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirmar envio"
        description="Essa ação é irreversível e não poderá ser desfeita."
        icon={<MdWarning />}
        iconColor="warning"
        iconSize="large"
      >
        <S.ModalContent>
          <S.ModalDescription>
            Tem certeza que deseja enviar a avaliação do mentor{" "}
            <strong>{mentor?.nomeCompleto}</strong>?
          </S.ModalDescription>
        </S.ModalContent>

        <S.ModalActions>
          <Button variant="outline" onClick={() => setModalOpen(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Confirmar envio
          </Button>
        </S.ModalActions>
      </Modal>
    </S.Container>
  );
}
