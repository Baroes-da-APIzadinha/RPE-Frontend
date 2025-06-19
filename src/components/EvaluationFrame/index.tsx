import React from "react";
import * as S from "./styles.ts";

interface EvaluationFrameProps {
  title: string;
  children: React.ReactNode;
}

const EvaluationFrame: React.FC<EvaluationFrameProps> = ({ title, children }) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Content>{children}</S.Content>
    </S.Container>
  );
};

export default EvaluationFrame;
