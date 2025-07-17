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

export const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;
