import styled from "styled-components";

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  font-size: ${({ theme }) => theme.font.sizes.small};
`;

export const Input = styled.input`
  display: none;
`;

export const Box = styled.span<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background: ${({ checked, theme }) =>
    checked ? theme.colors.primary.default : "transparent"};
  position: relative;
  transition: all 0.2s ease;

  &::after {
    content: "";
    position: absolute;
    top: 2px;
    left: 6px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    opacity: ${({ checked }) => (checked ? 1 : 0)};
    transition: opacity 0.2s ease;
  }
`;
