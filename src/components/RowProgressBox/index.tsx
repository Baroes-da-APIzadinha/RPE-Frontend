import React from "react";
import * as S from "./styles";

interface Bar {
  subtitle?: string;
  value: number; // 0-100
  color?: string;
}

interface RowProgressBoxProps {
  title: string;
  bars: Bar[];
}

const RowProgressBox: React.FC<RowProgressBoxProps> = ({ title, bars }) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>

      {bars.map((bar, idx) => (
        <S.BarWrapper key={idx}>
          <S.Header>
            <div>
              {bar.subtitle && <S.Subtitle>{bar.subtitle}</S.Subtitle>}
            </div>
            <S.Right>
              <S.Porcentagem>{bar.value.toFixed(1)}%</S.Porcentagem>
              <S.Label>Concluído</S.Label>
            </S.Right>
          </S.Header>

          <S.ProgressBar>
            <S.Progress $value={bar.value} $color={bar.color} />
          </S.ProgressBar>
        </S.BarWrapper>
      ))}
    </S.Container>
  );
};

export default RowProgressBox;
