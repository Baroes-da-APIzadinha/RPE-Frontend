import * as S from "./styles.ts";
import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import Button from "@/components/Button";
import ButtonFrame from "@/components/ButtonFrame";
import { MdAccountCircle } from "react-icons/md";
import { FaPaperPlane } from "react-icons/fa";
import { StarRating } from "@/components/StarRating";
import { useAvaliacaoMentor } from "@/hooks/avaliacoes/useAvaliacaoMentor";
import { useColaboradorById } from "@/hooks/colaboradores/useColaboradorById";
import { useOutletContext } from "react-router-dom";
import { toast } from "sonner";
import type { PerfilData } from "@/types/PerfilData.tsx";
import { preencherAvaliacaoMentor } from "@/services/HTTP/avaliacoes";
import { formatar } from "@/utils/formatters.ts";

export function MentoringPage() {
  const { perfil } = useOutletContext<{ perfil: PerfilData }>();
  const { avaliacao, loading } = useAvaliacaoMentor(perfil.userId);

  const [nota, setNota] = useState(0);
  const [justificativa, setJustificativa] = useState("");

  const { colaborador: mentor, loading: loadingMentor } = useColaboradorById(
    avaliacao?.idAvaliado ?? ""
  );

  const isReadonly = avaliacao?.status === "CONCLUIDA";

  useEffect(() => {
    if (isReadonly && avaliacao?.idAvaliacao) {
      setNota(avaliacao.avaliacaoColaboradorMentor?.nota ?? 0);
      setJustificativa(
        avaliacao.avaliacaoColaboradorMentor?.justificativa ?? ""
      );
    }
  }, [avaliacao, isReadonly]);

  const handleSubmit = async () => {
    if (!avaliacao?.idAvaliacao) return;

    const payload = {
      idAvaliacao: avaliacao.idAvaliacao,
      nota,
      justificativa,
    };

    // Log do payload antes do envio
    console.log("Payload enviado:", JSON.stringify(payload, null, 2));

    try {
      await preencherAvaliacaoMentor(payload);
      toast.success("Avaliação enviada com sucesso!");
    } catch (err) {
      console.error("Erro ao enviar avaliação:", err);
      toast.error("Erro ao enviar avaliação.");
    }
  };

  if (loading || loadingMentor) return <p>Carregando...</p>;
  if (!avaliacao) return <p>Avaliação de mentor não encontrada.</p>;

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
                onChange={(star) => setNota(star)}
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
              onChange={(e) => setJustificativa(e.target.value)}
              disabled={isReadonly}
            />
          </S.FormBlock>
        </Card>

        <ButtonFrame text="Para submeter sua avaliação, preencha os campos obrigatórios.">
          <Button disabled={isReadonly} type="submit">
            
            <FaPaperPlane /> Enviar
          </Button>
        </ButtonFrame>
      </form>
    </S.Container>
  );
}
