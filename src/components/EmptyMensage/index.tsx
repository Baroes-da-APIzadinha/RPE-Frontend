import React from "react";
import * as S from "./styles";

interface EmptyMessageProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
}

export const EmptyMessage: React.FC<EmptyMessageProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <S.Container>
      <S.IconWrapper>{icon}</S.IconWrapper>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </S.Container>
  );
};
