import React from "react";
import * as S from "./styles.ts";

interface Bar {
  subtitle: string;
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
      <S.BarsRow>
        {bars.map((bar, idx) => (
          <S.BarBox key={idx}>
            <S.BarHeader>
              <S.Subtitle>{bar.subtitle}</S.Subtitle>
              <S.Percent>{bar.value}%</S.Percent>
            </S.BarHeader>
            <S.ProgressBar>
              <S.Progress $value={bar.value} $color={bar.color} />
            </S.ProgressBar>
          </S.BarBox>
        ))}
      </S.BarsRow>
    </S.Container>
  );
};

export default RowProgressBox;
