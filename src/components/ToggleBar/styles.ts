import styled from "styled-components";

export const ToggleGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  background: ${({ theme }) => theme.colors.lightGray};
  padding: 0.4rem;
  border-radius: ${({ theme }) => theme.border.radius.xsmall};
`;

export const ToggleItem = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 0.8rem 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;

  font-weight: ${({ theme, active }) =>
    active ? theme.font.semibold : theme.font.medium};
  font-size: ${({ theme }) => theme.font.sizes.small};
  color: ${({ theme }) => theme.colors.text.secondary};
  background: ${({ theme, active }) =>
    active ? theme.colors.surface.default : "transparent"};
  border: none;
  border-radius: ${({ theme }) => theme.border.radius.xsmall};
  cursor: pointer;
  transition: background 0.2s ease;
`;
