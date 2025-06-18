import styled, { css } from "styled-components"
import theme from "../../styles/theme"

type ButtonProps = {
  variant?: "default" | "outline" | "primary"
}

export const ButtonContainer = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  padding: 0.8rem 1.6rem;
  font-size: ${theme.font.sizes.xsmall};
  font-weight: ${theme.font.semibold};
  border-radius: ${theme.border.radius.xxsmall};
  transition: all 0.2s ease-in-out;
  border: none;
  cursor: pointer;

  ${(props) =>
    props.variant === "outline"
      ? css`
          background-color: ${theme.colors.surface.default};
          color: ${theme.colors.text.title};
          border: 2px solid ${theme.colors.text.title};

          &:hover {
            background-color: ${theme.colors.surface.alt};
          }
        `
      : props.variant === "primary"
      ? css`
          background-color: ${theme.colors.primary.default};
          color: ${theme.colors.primary.onPrimary};

          &:hover {
            background-color: ${theme.colors.primary.hover};
          }
        `
      : css`
          background-color: ${theme.colors.button.default};
          color: ${theme.colors.primary.onPrimary};

          &:hover {
            background-color: ${theme.colors.button.hover};
          }
        `}
`
