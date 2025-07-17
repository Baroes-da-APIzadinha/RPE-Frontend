import styled from 'styled-components';

interface TrProps {
  $highlight?: boolean;
}

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;


export const TableContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  overflow-x: auto;
  padding: 1.2rem;

  @media (max-width: 768px) {
    padding: 1.2rem 0.8rem;
    border-radius: 0;
  }
`;



export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

export const Th = styled.th`
  text-align: left;
  padding: 1rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.font.bold};
  font-size: ${({ theme }) => theme.font.sizes.small};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  white-space: nowrap;

  @media (max-width: 768px) {
    display: block;
    padding: 0.8rem 0;
    border: none;
  }
`;

export const Td = styled.td`
  padding: 1rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.font.sizes.xsmall};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  white-space: nowrap;
  position: relative;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0.8rem;
    border: none;
    white-space: normal;

    &::before {
      content: attr(data-label);
      font-size: 1.2rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.text.secondary};
      margin-bottom: 0.2rem;
    }
  }
`;


export const Tr = styled.tr<TrProps>`
  background-color: ${({ $highlight, theme }) =>
    $highlight ? theme.colors.primary.light : "transparent"};

  @media (max-width: 768px) {
    display: block;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 8px;
    background-color: ${({ $highlight, theme }) =>
      $highlight ? theme.colors.primary.light : theme.colors.surface};
  }
`;

export const ActionCell = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary.default};
`;

export const TimestampCell = styled.div`
  display: flex;
  flex-direction: column;
  
  span:first-child {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 500;
  }
  
  span:last-child {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 0.875rem;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 16px;
  flex-wrap: wrap;

  span {
    font-size: ${({ theme }) => theme.font.sizes.xsmall};
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  button {
    padding: 8px 12px;
    border: none;
    background-color: ${({ theme }) => theme.colors.black};
    color: white;
    border-radius: 4px;
    cursor: pointer;

    &:disabled {
      background-color: ${({ theme }) => theme.colors.lightGray};
      cursor: not-allowed;
    }
  }
`;

