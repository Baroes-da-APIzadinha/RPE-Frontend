import React, { useState } from "react";
import * as S from "./styles";
import { FaStar } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface CriteryBoxProps {
  title: string;
  subtitle?: string;
  value?: { nota: number; justificativa: string };
  onChange?: (value: { nota: number; justificativa: string }) => void;
  error?: boolean;
}

const CriteryBox: React.FC<CriteryBoxProps> = ({
  title,
  subtitle,
  value = { nota: 0, justificativa: "" },
  onChange,
  error
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const [hover, setHover] = useState<number | null>(null);

  const handleRating = (nota: number) => {
    if (onChange) onChange({ ...value, nota });
  };

  const handleJustificationChange = (text: string) => {
    if (onChange) onChange({ ...value, justificativa: text });
  };

  return (
    <S.Container error={error}>
      <S.CollapseButton
        collapsed={collapsed}
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? "Expandir" : "Contrair"}
      >
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
              {[1, 2, 3, 4, 5].map((star) => (
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
              value={value.justificativa}
              onChange={(e) => handleJustificationChange(e.target.value)}
              rows={5}
            />
          </>
        )}
      </S.Content>
    </S.Container>
  );
};

export default CriteryBox;
