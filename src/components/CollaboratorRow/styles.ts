import styled from "styled-components";

export const Row = styled.tr`
  td {
    padding: 1.2rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    vertical-align: middle;
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const Colaborador = styled.td`
  display: flex;
  align-items: center;
  gap: 1rem;

  strong {
    font-weight: 600;
  }

  span {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 0.85rem;
  }
`;

export const Info = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-direction: column;

  p {
    font-weight: ${({ theme }) => theme.font.bold};
    font-size: ${({ theme }) => theme.font.sizes.small};
  }

  span {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: ${({ theme }) => theme.font.sizes.xsmall};
  }
`;

export const Track = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const Unit = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;


