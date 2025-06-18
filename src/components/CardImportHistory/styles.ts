// components/ImportHistoryCard/styles.ts
import styled from "styled-components";

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.surface.default};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.border.radius.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Header = styled.div`
  margin-bottom: 1.6rem;

  h2 {
    font-size: ${({ theme }) => theme.font.sizes.large};
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: ${({ theme }) => theme.font.bold};
  }

  span {
    font-size: ${({ theme }) => theme.font.sizes.small};
    color: ${({ theme }) => theme.colors.text.secondary };
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    padding: 0.8rem;
    font-weight: ${({ theme }) => theme.font.medium};
    font-size: ${({ theme }) => theme.font.sizes.small};
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  td {
    padding: 0.8rem;
    font-size: ${({ theme }) => theme.font.sizes.small};
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const Status = styled.span<{ status: "Sucesso" | "Erro" | "Em Andamento" }>`
  padding: 0.3rem 0.8rem;
  border-radius: ${({ theme }) => theme.border.radius.xxsmall};
  font-weight: ${({ theme }) => theme.font.bold};
  font-size: ${({ theme }) => theme.font.sizes.xsmall};
  color: ${({ theme }) => theme.colors.surface.default};
  background-color: ${({ status, theme }) =>
    status === "Sucesso"
      ? theme.colors.success.default
      : status === "Erro"
      ? theme.colors.error.default
      : theme.colors.secondary.default};
`;

export const Erros = styled.span<{ valor: number }>`
  color: ${({ valor, theme }) =>
    valor === 0 ? theme.colors.success.default : theme.colors.error.default};
  font-weight: ${({ theme }) => theme.font.medium};
`;
