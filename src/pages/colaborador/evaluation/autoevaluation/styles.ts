import theme from '@/styles/theme'
import styled from 'styled-components'

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

export const ModalSummary = styled.div`
  background: ${theme.colors.surface.default};
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid ${theme.colors.border};
`;

export const ModalSummaryTitle = styled.p`
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
`;

export const ModalSummaryText = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${theme.colors.text.secondary};
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;
