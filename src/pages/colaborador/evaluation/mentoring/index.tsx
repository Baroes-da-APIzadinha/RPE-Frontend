import * as S from "./styles.ts";
import { useState } from "react";
import { Card } from "@/components/Card";
import Button from "@/components/Button";
import ButtonFrame from "@/components/ButtonFrame";
import { MdAccountCircle } from "react-icons/md";
import { FaPaperPlane } from "react-icons/fa";
import { StarRating } from "@/components/StarRating";

export function MentoringPage() {
  const [nota, setNota] = useState(0);
  const [justificativa, setJustificativa] = useState("");

  const handleSubmit = () => {
    const data = {
      nota,
      justificativa,
    };
    console.log("ENVIAR BACKEND:", data);
  };

  return (
    <S.Container>
      <S.HeaderCard>
        <MdAccountCircle size={64} />
        <S.ColabInfo>
          <S.ColabNome>
            Mentor: <strong>Carlos Eduardo Silva</strong>
          </S.ColabNome>
          <S.ColabCargo>Teach Lead Senior</S.ColabCargo>
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
              />
            </S.StarsGroup>
          </S.FormBlock>
          <S.FormBlock>
            <S.Label>Justificativa</S.Label>
            <S.TextArea
              placeholder="Escreva sua avaliação sobre o mentor..."
              value={justificativa}
              onChange={(e) => setJustificativa(e.target.value)}
            />
          </S.FormBlock>
        </Card>

        <ButtonFrame text="Para submeter sua avaliação, preencha os campos obrigatórios.">
          <Button>
            <FaPaperPlane /> Enviar
          </Button>
        </ButtonFrame>
      </form>
    </S.Container>
  );
}
