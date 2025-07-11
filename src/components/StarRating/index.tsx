import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import * as S from "./styles";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  color?: "yellow" | "blue";
}

export const StarRating: React.FC<StarRatingProps> = ({
  value,
  onChange,
  readOnly,
  color = "blue",
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleClick = (val: number) => {
    if (!readOnly && onChange) {
      onChange(val);
    }
  };

  const displayValue = hoverValue ?? value;

  return (
    <S.StarRow>
      {Array.from({ length: 5 }).map((_, i) => {
        const starBase = i + 1;
        const filled = displayValue >= starBase;
        const halfFilled =
          displayValue >= starBase - 0.5 && displayValue < starBase;

        const icon = filled ? (
          <FaStar />
        ) : halfFilled ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        );

        return (
          <S.StarWrapper key={i}>
            {/* Área clicável esquerda (0.5) */}
            <S.HalfButton
              type="button"
              disabled={readOnly}
              onClick={() => onChange?.(starBase - 0.5)}
              onMouseEnter={() => setHoverValue(starBase - 0.5)}
              onMouseLeave={() => setHoverValue(null)}
              aria-label={`Nota ${starBase - 0.5}`}
            />
            {/* Área clicável direita (1.0) */}
            <S.HalfButton
              type="button"
              right
              disabled={readOnly}
              onClick={() => onChange?.(starBase)}
              onMouseEnter={() => setHoverValue(starBase)}
              onMouseLeave={() => setHoverValue(null)}
              aria-label={`Nota ${starBase}`}
            />
            {/* Ícone visual */}
            <S.StarButton
              type="button"
              $readOnly={!!readOnly}
              $active={filled || halfFilled}
              $half={halfFilled}
              $color={color}
            >
              {icon}
            </S.StarButton>
          </S.StarWrapper>
        );
      })}
    </S.StarRow>
  );
};
