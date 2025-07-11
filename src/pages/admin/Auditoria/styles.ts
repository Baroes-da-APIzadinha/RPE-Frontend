import styled from 'styled-components';

interface TrProps {
  $highlight?: boolean;
}

export const FiltersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin-top: 1.2rem;
  flex-direction: column;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FilterItem = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  gap: 0.4rem;

  label {
    font-size: ${({ theme }) => theme.font.sizes.xsmall};
    color: ${({ theme }) => theme.colors.text.secondary};
    font-weight: ${({ theme }) => theme.font.medium};
  }
`;


export const Title = styled.h1`
  font-size: ${({ theme }) => theme.font.sizes.xlarge};
  font-weight: ${({ theme }) => theme.font.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`

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

  @media (max-width: 768px) {
    border-radius: 0;
    overflow-x: scroll;
  }
`;


export const Table = styled.table`
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;
`;

export const Th = styled.th`
  text-align: left;
  padding: 1rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.font.bold};
  font-size: ${({ theme }) => theme.font.sizes.small};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  white-space: nowrap;
`;

export const Td = styled.td`
  padding: 1rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.font.sizes.xsmall};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  white-space: nowrap;
`;


export const Tr = styled.tr<TrProps>`
  background-color: ${({ $highlight, theme }) =>
    $highlight ? theme.colors.primary.light : "transparent"};
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

