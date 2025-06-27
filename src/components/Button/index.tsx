import * as S from "./styles.ts";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: "default" | "outline" | "primary" | "secondary" | "danger";
  disabled?: boolean;
};

function Button({ children, onClick, variant = 'default', ...props }: ButtonProps) {
  return <S.ButtonContainer onClick={onClick} variant={variant} {...props}>{children}</S.ButtonContainer>;
}

export default Button;