import styled from 'styled-components';
import theme from '@/styles/theme';

export const Container = styled.div`
`;

export const HeaderCard = styled.div`
  display: flex;
  align-items: center;
  background-color: ${theme.colors.surface.default};
  border-radius: ${theme.border.radius.medium};
  padding: 2rem;
  gap: 2rem;
  border: 1px solid ${theme.colors.border};
`;

export const ColabInfo = styled.div`
  flex: 1;
`;

export const ColabNome = styled.h2`
  font-size: ${theme.font.sizes.large};
  font-weight: ${theme.font.bold};
  color: ${theme.colors.text.primary};
`;

export const ColabCargo = styled.p`
  font-size: ${theme.font.sizes.small};
  color: ${theme.colors.text.secondary};
`;


export const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 0.4rem;
`;

export const StatusLabel = styled.span`
  font-size: ${theme.font.sizes.xsmall};
  color: ${theme.colors.text.secondary};
`;

export const InfoCard = styled.div`
  margin-top: 1.6rem;
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  background-color: ${theme.colors.surface.default};
  border-radius: ${theme.border.radius.medium};
  border: 1px solid ${theme.colors.border};
  padding: 1.6rem;
  font-size: ${theme.font.sizes.small};
  color: ${theme.colors.text.primary};

  strong {
    color: ${theme.colors.text.title};
  }
`;

// form
export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

export const FormBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  flex: 1;
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
  width: 100%;
`;

export const Label = styled.label`
  font-size: ${theme.font.sizes.small};
  font-weight: ${theme.font.semibold};
  color: ${theme.colors.text.primary};
`;

export const StarsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const Score = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.1rem;
  font-weight: 600;
  margin-left: 0.7rem;
`;

export const StarButton = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.secondary.default : theme.colors.lightGray};
  font-size: 1.7rem;
  transition: color 0.2s;
  padding: 0;
`;

export const TextArea = styled.textarea`
  resize: none;
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid ${theme.colors.border};
  border-radius: 8px;
  font-family: inherit;
  min-height: 100px;
`;
