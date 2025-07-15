import React from "react";
import * as S from "./styles";

interface LoadingMessageProps {
  message?: string;
}

export const LoadingMessage: React.FC<LoadingMessageProps> = ({
  message = "Carregando...",
}) => {
  return (
    <S.Container>
      <S.Spinner />
      <span>{message}</span>
    </S.Container>
  );
};
