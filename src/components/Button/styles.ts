import styled, { css } from "styled-components"
import theme from "../../styles/theme"

type ButtonProps = {
  variant?: "default" | "outline" | "primary" | "secondary" | "danger";
  disabled?: boolean;
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${(props) =>
    props.variant === "outline"
      ? css`
          background-color: ${theme.colors.button.outline.default};
          color: ${theme.colors.button.outline.text};
          border: 2px solid ${theme.colors.button.outline.border};

          &:hover {
            background-color: ${theme.colors.button.outline.hover};
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
        : props.variant === "secondary"
      ? css`
          background-color: ${theme.colors.warning.default};
          color: ${theme.colors.warning.textOnWarning};

          &:hover {
            background-color: ${theme.colors.warning.hover};
          }
        `
        : props.variant === "danger"
      ? css`
          background-color: ${theme.colors.error.default};
          color: ${theme.colors.error.onError};

          &:hover {
            background-color: ${theme.colors.error.hover};
          }
        `
      : css`
          background-color: ${theme.colors.primary.default};
          color: ${theme.colors.primary.onPrimary};

          &:hover {
            background-color: ${theme.colors.primary.hover};
          }
        `}
`
