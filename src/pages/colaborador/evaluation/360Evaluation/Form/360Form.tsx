import React, { useEffect, useState } from "react";
import * as S from "./styles.ts";
import { MdAccountCircle, MdArrowBack, MdOutlineInfo } from "react-icons/md";
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
  const { colaborador: colaboradorCompleto, loading: loadingColaborador } =
    useColaboradorById(idAvaliado);

  const [nota, setNota] = useState(0);
  const [melhoria, setMelhoria] = useState("");
  const [forte, setForte] = useState("");
  const [motivacao, setMotivacao] = useState<string | null>(null);
  const [jaEnviado, setJaEnviado] = useState(false);

  const [errors, setErrors] = useState({
    nota: false,
    motivacao: false,
    forte: false,
    melhoria: false,
  });

  useEffect(() => {
    if (avaliacao?.avaliacaoPares) {
      const pares = avaliacao.avaliacaoPares;
      setNota(parseFloat(pares.nota));
      setMotivacao(pares.motivadoTrabalharNovamente);
      setForte(pares.pontosFortes);
      setMelhoria(pares.pontosFracos);
      setJaEnviado(true);
    }
  }, [avaliacao]);

  if (loadingAvaliacao) return <p>Carregando...</p>;
  if (!avaliacao) return <p>Avaliação não encontrada.</p>;

  const colaborador = avaliacao.avaliado;

  const motivacoes = [
    { value: "Discordo Totalmente", label: "Discordo Totalmente" },
    { value: "Discordo Parcialmente", label: "Discordo Parcialmente" },
    { value: "Neutro", label: "Neutro" },
    { value: "Concordo Parcialmente", label: "Concordo Parcialmente" },
    { value: "Concordo Totalmente", label: "Concordo Totalmente" },
  ];

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
      const payload = {
        idAvaliacao: avaliacao.idAvaliacao,
        nota: nota,
        motivadoTrabalharNovamente: motivacao,
        pontosFortes: forte,
        pontosFracos: melhoria,
      };

      console.log("Payload enviado:", {
        nota,
        motivadoTrabalharNovamente: motivacao,
        pontosFortes: forte,
        pontosFracos: melhoria,
      });

      await preencherAvaliacaoPares(payload);
      toast.success("Avaliação enviada com sucesso!");
      setJaEnviado(true);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar a avaliação.");
    }
  };

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
              "Unidade desconhecida"}{" "}
            • Trabalhou junto por 6 meses
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
        <MdOutlineInfo size={20} />
        <span>
          <strong>Importante:</strong> Avalie com base no trabalho conjunto nos
          últimos 6 meses. Seja específico e construtivo em suas justificativas.
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
                    value={nota}
                    onChange={(val) => setNota(val)}
                    readOnly={jaEnviado}
                  />
                  <S.Score>{nota}</S.Score>
                </S.StarsGroup>
              </S.FormBlock>
              <S.FormBlock>
                <S.Label>
                  Você ficaria motivado em trabalhar novamente com este
                  colaborador?
                </S.Label>
                <Select
                  placeholder="Selecione uma opção"
                  value={motivacao}
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
          <Button type="submit" disabled={jaEnviado}>
            <FaPaperPlane />
            Enviar
          </Button>
        </ButtonFrame>
      </form>
    </S.Container>
  );
};

export default EvaluationDetails;
