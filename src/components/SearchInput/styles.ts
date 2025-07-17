import styled from "styled-components";
import theme from "@/styles/theme";

export const Container = styled.div`
  display: flex;
  align-items: center;
  background: ${theme.colors.surface.default};
  border-radius: ${theme.border.radius.medium};
  padding: 0 12px;
  height: 40px;
  border: 1px solid ${theme.colors.border};
  gap: 8px;

  &:hover {
    border-color: ${theme.colors.text.primary};
  }
`;

export const Input = styled.input`
  border: none;
  background: transparent;
  outline: none;
  font-size: 1rem;
  flex: 1;
  color: ${theme.colors.text.primary};

  &::placeholder {
    color: ${theme.colors.text.disabled};
  }
`;
