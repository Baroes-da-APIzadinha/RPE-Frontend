import styled from "styled-components";
import theme from "@/styles/theme";

export const Subtitle = styled.h2`
    font-size: ${({ theme }) => theme.font.sizes.xsmall};
    color: ${({ theme }) => theme.colors.text.secondary};
    display: flex;
    margin-bottom: 2.4rem;
    gap: 1.2rem;
    span.infos {
        font-weight: 600;
        color: ${({ theme }) => theme.colors.primary.default};
    }

`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4vh;
  gap: 1.2rem;
`;

export const Title = styled.h1`
  font-size: ${theme.font.sizes.xlarge};
  font-weight: ${theme.font.bold};
  color: ${theme.colors.text.primary};
`
export const CardSubtitle = styled.h2`
  font-size: ${theme.font.sizes.medium};
  font-weight: ${theme.font.medium};
  color: ${theme.colors.text.secondary};
`

// table Styles
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.font.sizes.small};

  th {
    text-align: left;
    padding: 1.2rem;
    font-weight: ${({ theme }) => theme.font.semibold};
    color: ${({ theme }) => theme.colors.text.secondary};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  td {
    padding: 1.2rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    vertical-align: middle;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  td:first-child {
    font-weight: ${({ theme }) => theme.font.semibold};
  }

  td:last-child {
    display: table-cell;
    text-align: center;
  }

  /* ===== Mobile ===== */
  @media (max-width: 768px) {
    thead {
      display: none;
    }

    tr {
      display: flex;
      flex-direction: column;
      background: ${({ theme }) => theme.colors.surface.hover};
      border: 1px solid ${({ theme }) => theme.colors.border};
      border-radius: 12px;
      margin-bottom: 1.6rem;
      padding: 1.2rem;
      gap: 0.8rem;
    }

    td {
      display: flex;
      align-items: flex-start;
      gap: 0.6rem;
      padding: 0;
      border: none;
      font-size: ${({ theme }) => theme.font.sizes.small};
      color: ${({ theme }) => theme.colors.text.primary};
      
    }

    td::before {
      content: attr(data-label);
      min-width: 100px;
      font-weight: ${({ theme }) => theme.font.semibold};
      color: ${({ theme }) => theme.colors.text.secondary};
    }
  }

`;

