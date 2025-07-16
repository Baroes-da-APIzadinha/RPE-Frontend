import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
  margin: 0;
`;

export const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
`;

export const SectionDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
  margin: 0 0 16px 0;
  line-height: 1.5;
`;

export const ActionButton = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const FormGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const ModalContent = styled.div`
  padding: 16px 0;
`;

export const WarningText = styled.p`
  color: ${({ theme }) => theme.colors.warning};
  font-weight: 600;
  margin: 0 0 16px 0;
`;

export const ModalDescription = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 24px;

  ul {
    margin: 8px 0 0 0;
    padding-left: 20px;
  }

  li {
    margin: 4px 0;
  }
`;

export const ModalButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export const StyledCard = styled.div`
    background: ${({ theme }) => theme.colors.surface.default};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.border.radius.medium};
  padding: 2.4rem;
  margin: 1.4rem 0 0 0;
`;
