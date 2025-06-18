import styled from "styled-components";

interface DropAreaProps {
  dragover: boolean;
}

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.surface.default};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.border.radius.medium};
  padding: 2rem;
  width: 100%;
`;

export const Header = styled.div`
  h2 {
    font-size: ${({ theme }) => theme.font.sizes.large};
    font-weight: ${({ theme }) => theme.font.bold};
  }

  p {
    font-size: ${({ theme }) => theme.font.sizes.small};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-top: 0.4rem;
  }

  margin-bottom: 1.6rem;
`;

export const Alert = styled.div`
  background: ${({ theme }) => theme.colors.surface.alt};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.border.radius.xsmall};
  font-size: ${({ theme }) => theme.font.sizes.small};
  margin-bottom: 1.6rem;

  strong {
    font-weight: ${({ theme }) => theme.font.semibold};
  }
`;

export const TemplateRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;

  span {
    font-size: ${({ theme }) => theme.font.sizes.small};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const TemplateButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.border.radius.xsmall};
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  font-size: ${({ theme }) => theme.font.sizes.small};
`;

export const DropArea = styled.div.attrs<DropAreaProps>(() => ({}))<DropAreaProps>`
  border: 2px dashed
    ${({ theme, dragover }) =>
      dragover ? theme.colors.primary.default : theme.colors.border};
  border-radius: ${({ theme }) => theme.border.radius.xsmall};
  padding: 3rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: border-color 0.2s ease;
`;

export const Icon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const FileInput = styled.input`
  display: none;
`;

export const DragText = styled.p`
  font-size: ${({ theme }) => theme.font.sizes.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 1rem;
`;

export const SelectButton = styled.button`
  margin-top: 1rem;
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.border.radius.xsmall};
  padding: 0.5rem 1.2rem;
  cursor: pointer;
  font-size: ${({ theme }) => theme.font.sizes.small};
`;

export const SelectedFileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
`;

export const FileName = styled.p`
  font-size: ${({ theme }) => theme.font.sizes.small};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.font.medium};
  word-break: break-all;
  text-align: center;
`;

