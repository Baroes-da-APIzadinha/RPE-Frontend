import theme from '@/styles/theme'
import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${theme.colors.background};
`
export const Main = styled.main`
  flex: 1;
  padding: ${theme.spacings.large};
  background-color: ${theme.colors.background};
  overflow-y: auto;
  padding-top: ${theme.spacings.small}; 
`
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
export const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface.default};
  border-radius: ${({ theme }) => theme.border.radius.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 1rem;
  padding: 2rem;
`;

// Card styles

// User card header
export const UserHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DropButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.4rem;
  display: flex;
  align-items: center;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

export const Avatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: ${theme.colors.border};
`;

export const Name = styled.h3`
  font-size: ${theme.font.sizes.medium};
  font-weight: ${theme.font.bold};
`;

export const Role = styled.p`
  font-size: ${theme.font.sizes.xsmall};
  font-weight: ${theme.font.semibold};
  color: ${theme.colors.text.secondary};
`;

export const Since = styled.p`
  font-size: ${theme.font.sizes.xsmall};
  color: ${theme.colors.text.secondary};
`;


export const UserActions = styled.div`
  display: flex;
  gap: 1.2rem;
`; 
export const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ScoreLabel = styled.span`
  font-size: ${theme.font.sizes.xsmall};
  color: ${theme.colors.text.secondary};
`;
export const ScoreValue = styled.span`
  font-size: ${theme.font.sizes.small};
  font-weight: ${theme.font.bold};
  color: ${theme.colors.text.primary};
`;

 
// Info Styles
export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.2rem;
  padding-top: 1.2rem;
  border-top: 1px solid ${theme.colors.border};
  gap: 1.2rem;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

export const StatusLabel = styled.span`
  font-size: ${theme.font.sizes.xsmall};
  color: ${theme.colors.text.primary};
`;

export const StatusLine = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.4rem;
`;

export const Badge = styled.span<{ $status: string }>`
  padding: 0.3rem 0.8rem;
  border-radius: ${theme.border.radius.full};
  font-size: ${theme.font.sizes.xsmall};
  font-weight: ${theme.font.semibold};
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: ${theme.colors.text.primary};

  ${({ $status, theme }) =>
    $status === "concluida"
      ? css`
          background: ${theme.colors.success.light};
          color: ${theme.colors.success.default};
        `
      : $status === "andamento"
      ? css`
          background: ${theme.colors.secondary.light};
          color: ${theme.colors.secondary.default};
        `
      : css`
          background: ${theme.colors.error.light};
          color: ${theme.colors.error.default};
        `}
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const Tag = styled.span`
  background: ${theme.colors.text.primary};
  color: ${theme.colors.background};
  padding: 0.4rem 0.8rem;
  border-radius: ${theme.border.radius.full};
  font-size: ${theme.font.sizes.xxsmall};
  font-weight: ${theme.font.normal};
`;

export const FooterButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  margin-top: 1rem;
`;
