import * as S from "./styles.ts";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: "default" | "outline" | "primary" | "secondary" | "danger";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

function Button({
  children,
  onClick,
  variant = "default",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <S.ButtonContainer
      onClick={onClick}
      variant={variant}
      type={type}
      {...props}
    >
      {children}
    </S.ButtonContainer>
  );
}

export default Button;
