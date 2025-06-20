import theme from '@/styles/theme'
import styled from 'styled-components'

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

//Header Styles
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
// Card Styles
export const Title = styled.h1`
  font-size: ${theme.font.sizes.xlarge};
  font-weight: ${theme.font.bold};
  color: ${theme.colors.text.primary};
`
export const Subtitle = styled.h2`
  font-size: ${theme.font.sizes.medium};
  font-weight: ${theme.font.medium};
  color: ${theme.colors.text.secondary};
`

export const CycleCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.border.radius.medium};
  padding: 1.2rem;
  margin-bottom: 1.2rem;
`;

export const CycleInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  strong {
    font-size: ${({ theme }) => theme.font.sizes.medium};
  }

  p {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const CycleAvatar = styled.div`
  width: 32px;
  height: 32px;
  background-color: gray;
  border-radius: 50%;
`;

export const CycleActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const StatusTag = styled.span<{ $status: string }>`
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;

  background-color: ${({ $status, theme }) =>
    $status === "concluída"
      ? theme.colors.success.light
      : theme.colors.secondary.light};

  color: ${({ $status, theme }) =>
    $status === "concluída"
      ? theme.colors.success.default
      : theme.colors.secondary.default};

  border: 1px solid
    ${({ $status, theme }) =>
      $status === "concluída"
        ? theme.colors.success.default
        : theme.colors.secondary.default};
`;

//Modal Styles
export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`
export const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`
export const ModalRow = styled.div`
  display: flex;
  gap: 1.2rem;
`;
export const ModalDiv = styled.div`
  flex: 1; 
`
export const ModalText = styled.p`
  font-size: ${({theme}) => theme.font.sizes.xsmall};
  font-weight: ${({theme}) => theme.font.semibold};
  color: ${({theme}) => theme.colors.text.primary};
  margin-bottom: 0.4rem;
`
export const ModalAlert = styled.p`
  font-size: ${({theme}) => theme.font.sizes.medium};
  font-weight: ${({theme}) => theme.font.bold};
  color: ${({theme}) => theme.colors.text.primary};
  margin-bottom: 0.4rem;
  margin-top: 0.4rem;
`
export const ModalCheckbox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8rem;
  margin-top: 0.8rem;
`;

