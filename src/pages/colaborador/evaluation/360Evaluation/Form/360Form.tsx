import React, { useEffect, useState } from "react";
import * as S from "./styles.ts";
import { MdAccountCircle, MdArrowBack, MdOutlineInfo } from "react-icons/md";
import Button from "@/components/Button";
import { mockColaboradores } from "@/data/colaboradores360";
import { Card } from "@/components/Card";
import { Select } from "@/components/Select";
import ButtonFrame from "@/components/ButtonFrame";
import { FaPaperPlane } from "react-icons/fa";
import { useAvaliacoes360 } from "@/hooks/Avaliacoes360";
import { toast } from "sonner";
import { StarRating } from "@/components/StarRating";

interface Props {
  id: number;
  onBack: () => void;
}

const EvaluationDetails: React.FC<Props> = ({ id, onBack }) => {
  const colaborador = mockColaboradores.find((c) => c.id === id);
  const [nota, setNota] = useState(0);
  const [melhoria, setMelhoria] = useState("");
  const [forte, setForte] = useState("");
  const [motivacao, setMotivacao] = useState<string | null>(null);
  const { salvarAvaliacao, buscarAvaliacao } = useAvaliacoes360();

  const [errors, setErrors] = useState({
    nota: false,
    motivacao: false,
    forte: false,
    melhoria: false,
  });

  if (!colaborador) {
    return <p>Colaborador não encontrado.</p>;
  }

  const motivacoes = [
    { value: "discordoTot", label: "Discordo Totalmente" },
    { value: "discordoParc", label: "Discordo Parcialmente" },
    { value: "neutro", label: "Neutro" },
    { value: "concordoParc", label: "Concordo Parcialmente" },
    { value: "concordoTot", label: "Concordo Totalmente" },
  ];

  const handleSubmit = () => {
    const newErrors = {
      nota: nota === 0,
      motivacao: !motivacao,
      forte: forte.trim() === "",
      melhoria: melhoria.trim() === "",
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);

    if (hasErrors) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    const avaliacaoFinal = {
      id: colaborador.id,
      nota,
      motivacao,
      forte,
      melhoria,
      status: "avaliado" as "avaliado",
    };

    salvarAvaliacao(avaliacaoFinal);
    toast.success("Avaliação enviada com sucesso!");

    console.log("ENVIADO AO BACKEND:", avaliacaoFinal);
  };

  useEffect(() => {
    const avaliacaoExistente = buscarAvaliacao(colaborador.id);
    if (avaliacaoExistente) {
      setNota(avaliacaoExistente.nota || 0);
      setMotivacao(avaliacaoExistente.motivacao || null);
      setForte(avaliacaoExistente.forte || "");
      setMelhoria(avaliacaoExistente.melhoria || "");
    }
  }, []);

  useEffect(() => {
    return () => {
      const parcial = {
        id: colaborador.id,
        nota,
        motivacao,
        forte,
        melhoria,
        status: (nota && motivacao ? "avaliado" : "andamento") as "avaliado" | "andamento" | "pendente",
      };
      salvarAvaliacao(parcial);
    };
  }, [nota, motivacao, forte, melhoria]);

  return (
    <S.Container>
      <S.HeaderCard>
        <MdAccountCircle size={64} />
        <S.ColabInfo>
          <S.ColabNome>
            Avaliando: <strong>{colaborador.name}</strong>
          </S.ColabNome>
          <S.ColabCargo>
            {colaborador.role} • {colaborador.unit} • Trabalhou junto por{" "}
            {colaborador.workTime}
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
          últimos {colaborador.workTime}. Seja específico e construtivo em suas
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
                    value={nota}
                    onChange={(star) => setNota(star)}
                  />
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
                  onChange={setMotivacao}
                  options={motivacoes}
                  error={errors.motivacao}
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
                />
              </S.FormBlock>
              <S.FormBlock>
                <S.Label>Pontos de melhoria</S.Label>
                <S.TextArea
                  placeholder="Justifique sua resposta..."
                  value={melhoria}
                  onChange={(e) => setMelhoria(e.target.value)}
                  error={errors.melhoria}
                />
              </S.FormBlock>
            </S.FormRow>
          </S.FormWrapper>
        </Card>
        <ButtonFrame text="Para submeter sua avaliação do colaborador, preencha todos os campos.">
          <Button>
            <FaPaperPlane />
            Enviar
          </Button>
        </ButtonFrame>
      </form>
    </S.Container>
  );
};

export default EvaluationDetails;
