import theme from '@/styles/theme'
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  gap: 1rem;
  color: ${theme.colors.text.secondary};
  font-size: ${theme.font.sizes.small};
`;

export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${theme.colors.border};
  border-top: 4px solid ${theme.colors.primary.default};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
