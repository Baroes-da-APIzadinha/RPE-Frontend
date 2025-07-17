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

  th,
  td {
    padding: 0.8rem;
    font-size: ${({ theme }) => theme.font.sizes.small};
  }

  th {
    text-align: left;
    font-weight: ${({ theme }) => theme.font.medium};
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  td {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }

  @media (max-width: 768px) {
    thead {
      display: none;
    }

    tr {
      display: block;
      margin-bottom: 1.6rem;
      border: 1px solid ${({ theme }) => theme.colors.border};
      border-radius: ${({ theme }) => theme.border.radius.xsmall};
      padding: 1rem;
      background: ${({ theme }) => theme.colors.surface.default};
    }

    td {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: none;
      padding: 0.4rem 0;
    }

    td::before {
      content: attr(data-label);
      font-weight: ${({ theme }) => theme.font.bold};
      color: ${({ theme }) => theme.colors.text.secondary};
    }

    td:nth-child(2),
    td:nth-child(5),
    td:nth-child(6) {
      display: none;
    }
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
