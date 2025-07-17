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
  align-items: center;
  gap: 1rem;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;



export const Avatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.lightGray};
  display: flex;
  align-items: center;
  justify-content: center;
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

export const StatusContainer = styled.div<{ $status: 'Avaliado' | 'Andamento' | 'Pendente' | 'Finalizado' | 'Em revisão' | 'Em equalização'  | 'Fechado'}>`
  border: 2px solid
    ${({ $status, theme }) =>
    ($status === 'Avaliado' || $status === 'Finalizado')
        ? theme.colors.success.text
        : $status === 'Andamento' || $status === 'Em revisão' || $status === 'Em equalização'
        ? theme.colors.secondary.hover
        : theme.colors.text.iconMuted};
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Status = styled.span<{$status: 'Avaliado' | 'Andamento' | 'Pendente' | 'Finalizado' | 'Em revisão' | 'Em equalização' | 'Fechado'}>`
  font-size: 1rem;
  font-weight: bold;
  color:     ${({ $status, theme }) =>
        $status === 'Avaliado' || $status === 'Finalizado'
        ? theme.colors.success.text
        : $status === 'Andamento' || $status === 'Em revisão' || $status === 'Em equalização'
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