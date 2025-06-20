import * as S from "./styles.ts";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: "default" | "outline" | "primary" | "secondary";
};

function Button({ children, onClick, variant = 'default' }: ButtonProps) {
  return <S.ButtonContainer onClick={onClick} variant={variant}>{children}</S.ButtonContainer>;
}

export default Button;