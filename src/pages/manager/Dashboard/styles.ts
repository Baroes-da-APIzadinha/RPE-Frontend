import theme from '@/styles/theme'
import styled from 'styled-components'

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4vh;
  gap: 1.2rem;
`
export const HeaderButtons = styled.div`
  display: flex;
  gap: 1.2rem;
`

// Revisões pedentes card
export const PendingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;  
  gap: 1.2rem;
`;

export const CircleWrapper = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Divider = styled.div`
  width: 1px;
  height: 100px;
  background-color: ${theme.colors.border};
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LeftWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3.5rem;
`;

export const People = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  font-size: ${theme.font.sizes.large}; 

`;

export const Description = styled.span`
  font-size: ${theme.font.sizes.medium};
  color: ${theme.colors.text.primary};

  strong {
    font-weight: 700;
  }
`;

// Equipe status card
export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export const SectionTitle = styled.h3`
  font-size: ${theme.font.sizes.medium};
  color: ${theme.colors.text.primary};
  font-weight: ${theme.font.bold};
`;

export const SectionSubtitle = styled.span`
  font-size: ${theme.font.sizes.small};
  color: ${theme.colors.text.secondary};
`;

export const CollaboratorList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CollaboratorCard = styled.div`
  background: ${theme.colors.surface.default};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.border.radius.medium};
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const UserInfo = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const Name = styled.p`
  font-weight: ${theme.font.bold};
  font-size: ${theme.font.sizes.medium};
`;

export const Role = styled.span`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.font.sizes.small};
`;

export const UserStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

export const StatusLabel = styled.div`
  font-size: ${theme.font.sizes.xsmall};
  color: ${theme.colors.text.secondary};
  margin-bottom: 0.3rem;
`;

export const StatusBadge = styled.div<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: ${theme.font.sizes.xsmall};
  font-weight: ${theme.font.semibold};
  padding: 0.3rem 0.6rem;
  border-radius: 1rem;
  background: ${({ $status, theme }) =>
    $status === "concluida"
      ? theme.colors.success.light
      : $status === "andamento"
      ? theme.colors.secondary.light
      : theme.colors.error.light};
  color: ${theme.colors.text.primary};
`;

export const Score = styled.div`
  font-weight: ${theme.font.semibold};
  font-size: ${theme.font.sizes.small};
  `;

export const Date = styled.div`
  font-size: ${theme.font.sizes.xsmall};
  color: ${theme.colors.text.secondary};
`;
