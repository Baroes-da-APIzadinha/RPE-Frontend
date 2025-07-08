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

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Label = styled.h4`
  font-size: ${theme.font.sizes.small};
  font-weight: ${theme.font.semibold};
  margin-bottom: 0.5rem;
`;

export const BadgeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.8rem;
`;

export const Badge = styled.span`
  background-color: ${theme.colors.primary.light};
  color: ${theme.colors.primary.default};
  font-size: ${theme.font.sizes.xxsmall};
  font-weight: ${theme.font.semibold};
  padding: 0.4rem 0.8rem;
  border-radius: ${theme.border.radius.full};
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;

  button {
    background: none;
    border: none;
    font-size: ${theme.font.sizes.xsmall};
    cursor: pointer;
    color: ${theme.colors.primary.default};
    padding: 0;
    margin: 0;
    line-height: 1;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.2rem;
  }
`;

export const CriteriaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

export const CriteriaTitle = styled.h3`
  font-size: ${theme.font.sizes.medium};
  font-weight: ${theme.font.bold};
`;

export const CriteriaDescription = styled.p`
  font-size: ${theme.font.sizes.xsmall};
  font-weight: ${theme.font.semibold};
  color: ${theme.colors.text.secondary};
`;



export const CriteriaActions = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.8rem;
  }

`; 

export const CriteriaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CriteriaLabel = styled.span`
  font-size: ${theme.font.sizes.xsmall};
  color: ${theme.colors.text.secondary};
`;
export const CriteriaValue = styled.span`
  font-size: ${theme.font.sizes.small};
  font-weight: ${theme.font.bold};
  color: ${theme.colors.text.primary};
`;

export const CriteriaBadge = styled.span<{ ativo: boolean }>`
  background-color: ${({ ativo, theme }) =>
    ativo ? theme.colors.success.light : theme.colors.lightGray};
  color: ${({ ativo, theme }) =>
    ativo ? theme.colors.success.default : theme.colors.text.secondary};
  font-size: ${theme.font.sizes.xxsmall};
  font-weight: ${theme.font.semibold};
  padding: 0.4rem 0.8rem;
  border-radius: ${theme.border.radius.full};
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
`;

