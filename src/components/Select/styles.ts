import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.font.sizes.small};
  font-weight: ${({ theme }) => theme.font.medium};
  margin-bottom: 0.4rem;
  display: block;
`;

export const SelectBox = styled.div<{ $open: boolean; error?: boolean }>`
  
  background: ${({ theme }) => theme.colors.button.outline.default};
  border: 1px solid ${({ error, theme }) =>  error ? theme.colors.error.default : theme.colors.border};
  
  border-radius: ${({ theme }) => theme.border.radius.xsmall};
  padding: 0.8rem 1.2rem;
  font-size: ${({ theme }) => theme.font.sizes.small};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary.default};
  }
`;

export const Chevron = styled.span<{ $open: boolean }>`
  transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0)")};
  transition: 0.2s ease;
  font-size: 1.2rem;
`;

export const OptionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  max-height: 200px;
  overflow-y: auto;

  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.surface.default};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.border.radius.xsmall};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  margin-top: 0.4rem;
  z-index: 10;
`;

export const Option = styled.li<{ $selected?: boolean }>`
  padding: 0.8rem 1.2rem;
  font-size: ${({ theme }) => theme.font.sizes.small};
  cursor: pointer;
  transition: background 0.2s;
  border-radius: ${({ theme }) => theme.border.radius.xsmall};

  background-color: ${({ $selected, theme }) =>
    $selected ? theme.colors.primary.light : 'transparent'};

  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.primary.default : theme.colors.text.primary};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface.hover};
  }
`;
