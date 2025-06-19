import React, { useState } from "react";
import * as S from "./styles";
import { FaStar } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";


interface CriteryBoxProps {
  title: string;
  subtitle?: string;
  value?: { nota: number; justificativa: string };
  onChange?: (value: { nota: number; justificativa: string }) => void;
}

const CriteryBox: React.FC<CriteryBoxProps> = ({ title, subtitle, value = { nota: 0, justificativa: "" }, onChange }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [hover, setHover] = useState<number | null>(null);
  const [justificationDraft, setJustificationDraft] = useState(value.justificativa);

  // Atualiza draft se valor externo mudar
  React.useEffect(() => {
    setJustificationDraft(value.justificativa);
  }, [value.justificativa]);

  const handleRating = (nota: number) => {
    if (onChange) onChange({ ...value, nota });
  };
  const handleJustificationBlur = () => {
    console.log("blur");
    if (onChange) onChange({ ...value, justificativa: justificationDraft });
  };

  return (
    <S.Container>
      <S.CollapseButton collapsed={collapsed} onClick={() => setCollapsed((c) => !c)} aria-label={collapsed ? "Expandir" : "Contrair"}>
        {collapsed ? <FaChevronDown /> : <FaChevronUp />}
      </S.CollapseButton>
      <S.Header>
        <S.Title>{title}</S.Title>
        {!collapsed && subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
      </S.Header>
      <S.Content collapsed={collapsed}>
        {!collapsed && (
          <>
            <S.RatingRow>
              <S.Label>Nota:</S.Label>
              {[1,2,3,4,5].map((star) => (
                <S.StarButton
                  key={star}
                  onClick={() => handleRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(null)}
                  $active={star <= (hover ?? value.nota)}
                  aria-label={`Dar nota ${star}`}
                >
                  <FaStar />
                </S.StarButton>
              ))}
              <S.Score>{value.nota}</S.Score>
            </S.RatingRow>
            <S.JustificationLabel>Justificativa</S.JustificationLabel>
            <S.JustificationArea
              placeholder="Justifique sua nota..."
              value={justificationDraft}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setJustificationDraft(e.target.value)}
              onBlur={handleJustificationBlur}
              rows={5}
              
            />
          </>
        )}
      </S.Content>
    </S.Container>
  );
};

export default CriteryBox;
