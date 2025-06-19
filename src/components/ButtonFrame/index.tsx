import React from "react";
import * as S from "./styles.ts";

interface EButtonFrameProps {
  text?: string;
  children: React.ReactNode;
}

const ButtonFrame: React.FC<EButtonFrameProps> = ({ text, children }) => {
  return (
    <S.Container>
      <S.Text>{text}</S.Text>
      <S.Content>{children}</S.Content>
    </S.Container>
  );
};

export default ButtonFrame;
