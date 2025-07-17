import styled from 'styled-components';
import theme from '@/styles/theme'

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4vh;
  gap: 1.2rem;
`;

export const HeaderButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;


export const CardText = styled.p`
  align-items: center;
  font-size: ${theme.font.sizes.xsmall}
`;

export const Title = styled.h1`
  font-size: ${theme.font.sizes.medium};
  font-weight: ${theme.font.bold};
  color: ${theme.colors.text.primary};
`;

export const Subtitle = styled.h2`
  font-size: ${theme.font.sizes.small};
  font-weight: ${theme.font.medium};
  color: ${theme.colors.text.secondary};
`;

export const CardSeparator = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ReferTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: ${theme.font.sizes.large};
  font-weight: ${theme.font.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: 1rem;

  svg {
    font-size: 1.6rem;
  }

  span {
    background-color: ${theme.colors.surface.alt};
    color: ${theme.colors.text.primary};
    font-size: ${theme.font.sizes.xsmall};
    font-weight: ${theme.font.bold};
    padding: 0.2rem 0.6rem;
    border-radius: 1rem;
  }
`;

export const ReferSeparator = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${theme.colors.border};
  margin: 1.6rem 0; 
`;

// Modal Styles
export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;
export const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;
export const ModalRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
export const ModalText = styled.p`
  font-size: ${theme.font.sizes.xsmall};
  font-weight: ${theme.font.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: 0.4rem;
`

export const ModalTextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  margin-top: 8px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-family: inherit;
  font-size: 1rem;
  resize: none;
  oveflow-y: auto;
  margin-bottom: 1.2rem;
`;

export const ModalInputGroup = styled.div`
  flex: 1;
`;

export const ReferenceTypeButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ReferenceTypeButton = styled.button<{ selected?: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-size: 1rem;
  padding: 0.6rem 1.2rem;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.border.radius.xsmall};
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.primary.light : theme.colors.surface.alt};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.primary.pressed : theme.colors.text.secondary};
  font-weight: ${({ selected }) => (selected ? 600 : 500)};
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

//Reference Card assets

export const ReferenceCard = styled.div`
  display: flex;
  align-items: center;
  background: ${theme.colors.surface.default};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.border.radius.medium};
  padding: 1.2rem;
  gap: 1.2rem;
  margin-bottom: 1rem;
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

export const UserData = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  strong {
    font-size: 1.4rem;
    color: ${theme.colors.text.primary};
  }

  span {
    font-size: 1.2rem;
    color: ${theme.colors.text.secondary};
    font-weight: 500;
  }

  small {
    font-size: 1rem;
    color: ${theme.colors.text.secondary};
  }
`;

export const TypeBadge = styled.div<{ $tipo: "tecnica" | "cultural" }>`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 1rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid ${({ theme, $tipo }) =>
    $tipo === "tecnica" ? theme.colors.primary.default : theme.colors.success.default};
  color: ${({ theme, $tipo }) =>
    $tipo === "tecnica" ? theme.colors.primary.default : theme.colors.success.default};
`;

export const DeleteIcon = styled.div`
  cursor: pointer;
  color: ${theme.colors.error.default};
  font-size: 1.4rem;

  &:hover {
    opacity: 0.8;
  }
`;

export const EditIcon = styled.div`
  cursor: pointer;
  color: ${theme.colors.info.default};
  font-size: 1.4rem;

  &:hover {
    opacity: 0.8;
  }
`;