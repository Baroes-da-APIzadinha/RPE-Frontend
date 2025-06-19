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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Name = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Role = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const WorkTime = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.primary};
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
