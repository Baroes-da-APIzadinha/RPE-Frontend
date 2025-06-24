import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.surface.default};
  width: 100%;
`;

export const InfoContainer = styled.div`
    & div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    
    }
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
`;

export const Name = styled.span`
  font-weight: bold;
  font-size: ${({ theme }) => theme.font.sizes.xsmall};
  color: ${({ theme }) => theme.colors.text.primary};
    font-weight: ${({ theme }) => theme.font.bold};

`;

export const Role = styled.span`
    font-size: ${({ theme }) => theme.font.sizes.xsmall};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.font.semibold};
`;

export const WorkTime = styled.span`
  font-size: ${({ theme }) => theme.font.sizes.xsmall};
  color: ${({ theme }) => theme.colors.text.secondary};

`;

export const StatusContainer = styled.div<{ $status: 'avaliado' | 'andamento' | 'pendente' }>`
  border: 2px solid
    ${({ $status, theme }) =>
      $status === 'avaliado'
        ? theme.colors.success.text
        : $status === 'andamento'
        ? theme.colors.secondary.hover
        : theme.colors.text.iconMuted};
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Status = styled.span<{$status: 'avaliado' | 'andamento' | 'pendente' }>`
  font-size: 1rem;
  font-weight: bold;
  color:     ${({ $status, theme }) =>
      $status === 'avaliado'
        ? theme.colors.success.text
        : $status === 'andamento'
        ? theme.colors.secondary.hover
        : theme.colors.text.iconMuted};
`;

export const RightContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ArrowButton = styled.button`
  background: transparent;
  border: none;
  padding: 0.4rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};
  transition: 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.hover};
  }
`;