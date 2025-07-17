import styled from "styled-components";
import theme from "@/styles/theme";

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

export const CriteriaContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: stretch;
  transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 1;
`;


export const CriteriaSection = styled.div`
  flex: 1 1 320px;
  max-width: 100%;
  background: ${theme.colors.surface.default};
  border-radius: 8px;
  padding: 20px 20px 24px 20px;
  border: 1px solid ${theme.colors.border};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: .5rem;
`;


export const SectionTitle = styled.h3`
  font-size: ${theme.font.sizes.medium};
  font-weight: ${theme.font.bold};
  margin-bottom: 1rem;
`;

export const Subtitle = styled.span`
  font-size: ${theme.font.sizes.small};
  font-weight: ${theme.font.bold};
  color: ${theme.colors.text.secondary};
  margin-bottom: .5rem;
`;



export const CriterioHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .5rem;
  padding-bottom: 0;
  background: ${theme.colors.surface.default};
  transition: background 0.35s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const ToggleIcon = styled.span<{ $open: boolean }>`
  margin-left: 12px;
  color: ${theme.colors.text.primary};
  cursor: pointer;
  transition: color 0.35s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const NotaBadge = styled.span<{ $visible?: boolean }>`
  display: ${({ $visible }) => ($visible === false ? 'none' : 'inline-flex')};
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 10px;
  border-radius: 8px;
  background: ${theme.colors.primary.light};
  color: ${theme.colors.text.primary};
  font-weight: ${theme.font.bold};
  font-size: 1rem;
  margin: 0 8px;
`;



// Modal styles
export const ModalContent = styled.div`
  margin-bottom: 1.5rem;
`;

export const ModalDescription = styled.p`
  margin: 0 0 1rem 0;
  font-size: 1rem;
  line-height: 1.5;
  color: ${theme.colors.text.primary};
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;