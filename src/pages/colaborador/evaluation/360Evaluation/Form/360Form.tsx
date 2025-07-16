import React, { useEffect, useState } from "react";
import * as S from "./styles.ts";
import {
  MdAccountCircle,
  MdArrowBack,
  MdOutlineAssignmentTurnedIn,
  MdOutlineInfo,
  MdWarning,
} from "react-icons/md";
import Button from "@/components/Button";
import { Card } from "@/components/Card";
import { Select } from "@/components/Select";
import ButtonFrame from "@/components/ButtonFrame";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "sonner";
import { StarRating } from "@/components/StarRating";
import { useOutletContext } from "react-router-dom";
import { useAvaliacaoParesPorId } from "@/hooks/avaliacoes/useAvaliacaoParesPorId.ts";
import type { PerfilData } from "@/types/PerfilData.tsx";
import { preencherAvaliacaoPares } from "@/services/HTTP/avaliacoes.ts";
import { useColaboradorById } from "@/hooks/colaboradores/useColaboradorById.ts";
import { formatar } from "@/utils/formatters.ts";
import { Modal } from "@/components/Modal/index.tsx";
import { LoadingMessage } from "@/components/LoadingMessage/index.tsx";
import { EmptyMessage } from "@/components/EmptyMensage/index.tsx";

interface Props {
  id: string;
  onBack: () => void;
}

const EvaluationDetails: React.FC<Props> = ({ id, onBack }) => {
  const { perfil } = useOutletContext<{ perfil: PerfilData }>();
  const { avaliacao, loading: loadingAvaliacao } = useAvaliacaoParesPorId(
    perfil.userId,
    id
  );
  const idAvaliado = avaliacao?.idAvaliado ?? "";
  console.log("idAvaliado:", idAvaliado);
  const { colaborador: colaboradorCompleto, loading: loadingColaborador } =
    useColaboradorById(
      idAvaliado && idAvaliado !== "" ? idAvaliado : undefined
    );

  const [nota, setNota] = useState(0);
  const [melhoria, setMelhoria] = useState("");
  const [forte, setForte] = useState("");
  const [motivacao, setMotivacao] = useState<string | null>(null);
  const status = avaliacao?.status;
  const jaEnviado = status === "CONCLUIDA";

  const [modalOpen, setModalOpen] = useState(false);
  const [errors, setErrors] = useState({
    nota: false,
    motivacao: false,
    forte: false,
    melhoria: false,
  });

  // Se já foi avaliado
  useEffect(() => {
    if (avaliacao?.avaliacaoPares) {
      const pares = avaliacao.avaliacaoPares;
      setNota(parseFloat(pares.nota));
      setMotivacao(pares.motivadoTrabalharNovamente);
      setForte(pares.pontosFortes);
      setMelhoria(pares.pontosFracos);
    }
  }, [avaliacao]);

  const colaborador = avaliacao?.avaliado ?? null;

  const motivacoes = [
    { value: "Não Se Aplica", label: "Não Se Aplica" },
    { value: "Discordo Totalmente", label: "Discordo Totalmente" },
    { value: "Discordo Parcialmente", label: "Discordo Parcialmente" },
    { value: "Neutro", label: "Neutro" },
    { value: "Concordo Parcialmente", label: "Concordo Parcialmente" },
    { value: "Concordo Totalmente", label: "Concordo Totalmente" },
  ];

  const montarPayload = (status: "EM_RASCUNHO" | "CONCLUIDA") => {
    const payload = {
      idAvaliacao: avaliacao?.idAvaliacao ?? "",
      status,
      nota: isNaN(nota) ? 0 : nota,
      motivacao:
        motivacao && motivacoes.some((m) => m.value === motivacao)
          ? motivacao
          : undefined,
      pontosFortes: forte ?? "",
      pontosFracos: melhoria ?? "",
    };

    return payload;
  };

  // AutoSave
  useEffect(() => {
    if (!avaliacao?.idAvaliacao || status === "CONCLUIDA") return;

    const interval = setInterval(() => {
      // Só envia rascunho se algum campo foi preenchido
      const temConteudo =
        nota > 0 ||
        (motivacao && motivacao.trim() !== "") ||
        forte.trim() !== "" ||
        melhoria.trim() !== "";

      if (!temConteudo) return;

      preencherAvaliacaoPares(montarPayload("EM_RASCUNHO"))
        .then(() => console.log("Auto save executado"))
        .catch((err) => console.warn("Erro no autosave:", err));
    }, 10000); // salva a cada 15s

    return () => clearInterval(interval);
  }, [nota, motivacao, forte, melhoria, avaliacao?.idAvaliacao, status]);

  const handleSubmit = async () => {
    const newErrors = {
      nota: nota === 0,
      motivacao: !motivacao || motivacao.trim() === "",
      forte: forte.trim() === "",
      melhoria: melhoria.trim() === "",
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await preencherAvaliacaoPares(montarPayload("CONCLUIDA"));
      toast.success("Avaliação enviada com sucesso!");
      window.location.reload();
    } catch (err) {
      console.error("Erro no envio:", err);
      toast.error("Erro ao enviar a avaliação.");
    }
  };

  if (!avaliacao || !avaliacao.avaliado) {
    return (
      <EmptyMessage
        icon={<MdOutlineAssignmentTurnedIn size={32} />}
        title="Nenhuma avaliação de pares encontrada"
        description="Verifique com sua liderança se você foi incluído no ciclo atual."
      />
    );
  }

  if (loadingAvaliacao || loadingColaborador) {
    return <LoadingMessage message="Carregando formulário de avaliação..." />;
  }

  return (
    <S.Container>
      <S.HeaderCard>
        <MdAccountCircle size={64} />
        <S.ColabInfo>
          <S.ColabNome>
            Avaliando: <strong>{colaborador?.nomeCompleto}</strong>
          </S.ColabNome>
          <S.ColabCargo>
            {formatar(colaboradorCompleto?.cargo as string) ||
              "Cargo desconhecido"}{" "}
            •{" "}
            {formatar(colaboradorCompleto?.unidade as string) ||
              "Unidade desconhecida"}
          </S.ColabCargo>
        </S.ColabInfo>
        <S.RightContent>
          <Button variant="outline" onClick={onBack}>
            <MdArrowBack />
            Voltar
          </Button>
        </S.RightContent>
      </S.HeaderCard>

      <S.InfoCard>
        <MdOutlineInfo size={24} />
        <span>
          <strong>Importante:</strong> Avalie com base na sua experiência real
          de trabalho com o colaborador. Seja específico e construtivo em suas
          justificativas.
        </span>
      </S.InfoCard>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Card>
          <S.FormWrapper>
            <S.FormRow>
              <S.FormBlock>
                <S.Label>Dê uma avaliação de 1 a 5 ao colaborador</S.Label>
                <S.StarsGroup>
                  <StarRating
                    value={nota || 0}
                    onChange={(val) => setNota(val)}
                    readOnly={jaEnviado}
                  />
                  <S.Score>{nota || 0}</S.Score>
                </S.StarsGroup>
              </S.FormBlock>
              <S.FormBlock>
                <S.Label>
                  Você ficaria motivado em trabalhar novamente com este
                  colaborador?
                </S.Label>
                <Select
                  placeholder="Selecione uma opção"
                  value={motivacao ?? null}
                  onChange={(val) => setMotivacao(val as string)}
                  options={motivacoes}
                  error={errors.motivacao}
                  disabled={jaEnviado}
                />
              </S.FormBlock>
            </S.FormRow>
            <S.FormRow>
              <S.FormBlock>
                <S.Label>Pontos que faz bem e deve explorar</S.Label>
                <S.TextArea
                  placeholder="Justifique sua resposta..."
                  value={forte}
                  onChange={(e) => setForte(e.target.value)}
                  error={errors.forte}
                  disabled={jaEnviado}
                />
              </S.FormBlock>
              <S.FormBlock>
                <S.Label>Pontos de melhoria</S.Label>
                <S.TextArea
                  placeholder="Justifique sua resposta..."
                  value={melhoria}
                  onChange={(e) => setMelhoria(e.target.value)}
                  error={errors.melhoria}
                  disabled={jaEnviado}
                />
              </S.FormBlock>
            </S.FormRow>
          </S.FormWrapper>
        </Card>
        <ButtonFrame text="Para submeter sua avaliação do colaborador, preencha todos os campos.">
          <Button
            type="button"
            onClick={() => setModalOpen(true)}
            disabled={jaEnviado}
          >
            <FaPaperPlane />
            Enviar
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
            Tem certeza que deseja enviar a avaliação de{" "}
            <strong>{colaborador?.nomeCompleto}</strong>?
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
};

export default EvaluationDetails;
