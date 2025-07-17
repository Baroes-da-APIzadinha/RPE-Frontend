import React, { useState } from "react";
import * as S from "./styles";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { StarRating } from "../StarRating";

interface CriteryBoxProps {
  title: string;
  subtitle?: string;
  value?: { nota: number; justificativa: string };
  onChange?: (value: { nota: number; justificativa: string }) => void;
  error?: boolean;
  readOnly?: boolean;
}

const CriteryBox: React.FC<CriteryBoxProps> = ({
  title,
  subtitle,
  value = { nota: 0, justificativa: "" },
  onChange,
  error,
  readOnly = false,
}) => {
  const [collapsed, setCollapsed] = useState(false); 

  const handleRating = (nota: number) => {
    if (!readOnly && onChange) onChange({ ...value, nota });
  };

  const handleJustificationChange = (text: string) => {
    if (!readOnly && onChange) onChange({ ...value, justificativa: text });
  };

  return (
    <S.Container error={error}>
      <S.Header>
        <S.HeaderDiv>
          <S.Title>{title}</S.Title>
          <S.NotaBadge $visible={true}>{value.nota}</S.NotaBadge>
          <S.CollapseButton
            collapsed={collapsed}
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? "Expandir" : "Contrair"}
          >
            {collapsed ? <FaChevronDown /> : <FaChevronUp />}
          </S.CollapseButton>
        </S.HeaderDiv>

        {!collapsed && subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
      </S.Header>

      <S.Content collapsed={collapsed}>
        <S.RatingRow>
          <S.Label>Nota:</S.Label>
          <StarRating
            value={value.nota}
            onChange={handleRating}
            readOnly={readOnly}
          />
          <S.Score>{value.nota}</S.Score>
        </S.RatingRow>

        <S.JustificationLabel>Justificativa</S.JustificationLabel>
        <S.JustificationArea
          placeholder="Justifique sua nota..."
          value={value.justificativa}
          onChange={(e) => handleJustificationChange(e.target.value)}
          rows={5}
          disabled={readOnly}
        />
      </S.Content>
    </S.Container>
  );
};

export default CriteryBox;
