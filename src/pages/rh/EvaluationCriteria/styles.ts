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
`;

export const HeaderButtons = styled.div`
  display: flex;
  gap: 1.2rem;
`

export const DesktopButtons = styled.div`
  display: flex;
  gap: 1.2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileActions = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

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

//Table Styles
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
    vertical-align: top;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  td:first-child {
    font-weight: ${({ theme }) => theme.font.semibold};
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



export const Badge = styled.span`
  background: ${({ theme }) => theme.colors.surface.default};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.2rem 0.8rem;
  font-size: ${({ theme }) => theme.font.sizes.xsmall};
  font-weight: ${({ theme }) => theme.font.semibold};
  border-radius: 9999px;
`;
export const Actions = styled.div`
  cursor: pointer;
  font-size: 1.4rem;
  text-align: center;
`;

// Modal Styles
export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.23rem;
`
export const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`
export const ModalSelectsRow = styled.div`
  display: flex;
  gap: 1.2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ModalSelect = styled.div`
  flex: 1; 
`
export const ModalText = styled.p`
  font-size: ${theme.font.sizes.xsmall};
  font-weight: ${theme.font.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: 0.4rem;
`

export const ModalSubText = styled.p`
  font-size: ${theme.font.sizes.xxsmall};
  font-weight: ${theme.font.medium};
  color: ${theme.colors.text.secondary};
  margin-bottom: 0.4rem;
`;

export const ModalCheckbox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8rem;
  margin-top: 0.8rem;
`;

export const ModalTextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  margin-top: 8px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-family: inherit;
  font-size: 1rem;
`;