import React from "react";
import * as S from "./styles.ts";

interface EvaluationFrameProps {
  title: string;
  children: React.ReactNode;
  count?: string;
  grade?: string;
}

const EvaluationFrame: React.FC<EvaluationFrameProps> = ({
  title,
  children,
  count,
}) => {
  return (
    <S.Container>
      <S.Header>
        <S.Title>{title}</S.Title>
        {count && <S.CountContainer>{count} preenchidos</S.CountContainer>}
      </S.Header>
      <S.Content>{children}</S.Content>
    </S.Container>
  );
};

export default EvaluationFrame;
