import styled from "styled-components";
import theme from "@/styles/theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 1rem;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.border.radius.xsmall};
  font-size: ${theme.font.sizes.small};
  color: ${theme.colors.text.primary};
  background-color: ${theme.colors.surface.default};
  resize: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${theme.colors.primary.default};
    outline: none;
  }

  &::placeholder {
    color: ${theme.colors.text.secondary};
  }
`;
