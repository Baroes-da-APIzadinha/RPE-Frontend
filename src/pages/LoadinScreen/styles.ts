import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff; // ou use o tema, ex: ${({ theme }) => theme.colors.background}
`;


const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #ccc;
  border-top-color: #007bff; // azul base, ou use do tema
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  margin-bottom: 16px;
`;

export const Text = styled.span`
  font-size: 1.25rem;
  color: #555;
  font-weight: 500;
`;
