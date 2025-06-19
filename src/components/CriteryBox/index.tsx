import React, { useState } from "react";
import * as S from "./styles";
import { FaStar } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface CriteryBoxProps {
  title: string;
  subtitle?: string;
  initialRating?: number;
}

const CriteryBox: React.FC<CriteryBoxProps> = ({ title, subtitle, initialRating = 0 }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState<number | null>(null);
  const [justification, setJustification] = useState("");
  const [collapsed, setCollapsed] = useState(true);

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
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(null)}
                  $active={star <= (hover ?? rating)}
                  aria-label={`Dar nota ${star}`}
                >
                  <FaStar />
                </S.StarButton>
              ))}
              <S.Score>{rating}</S.Score>
            </S.RatingRow>
            <S.JustificationLabel>Justificativa</S.JustificationLabel>
            <S.JustificationArea
              placeholder="Justifique sua nota..."
              value={justification}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setJustification(e.target.value)}
              rows={3}
            />
          </>
        )}
      </S.Content>
    </S.Container>
  );
};

export default CriteryBox;
