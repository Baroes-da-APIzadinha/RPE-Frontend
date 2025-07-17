import styled from "styled-components";

interface DropdownProps {
  $position?: "top" | "bottom";
}

export const Container = styled.div`
  position: relative;
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.4rem;
  padding: 0.4rem;
  border-radius: 4px;
`;

export const Dropdown = styled.div<DropdownProps>`
  position: absolute;
  right: 0;

  ${({ $position = "top" }) =>
    $position === "top"
      ? `
        bottom: 100%;
        margin-bottom: 0.4rem;
      `
      : `
        top: 100%;
        margin-top: 0.4rem;
      `}

  background: ${({ theme }) => theme.colors.surface.default};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  min-width: 160px;
  z-index: 10;
  padding: 0.4rem 0;
`;


export const Title = styled.div`
  font-weight: ${({ theme }) => theme.font.semibold};
  font-size: ${({ theme }) => theme.font.sizes.xsmall};
  padding: 0.6rem 1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  pointer-events: none;
`;

export const Item = styled.button<{ danger?: boolean }>`
  width: 100%;
  text-align: left;
  padding: 0.8rem 1rem;
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.font.sizes.xsmall};
  color: ${({ theme, danger }) =>
    danger ? theme.colors.error.default : theme.colors.text.primary};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.button.outline.hover};
  }
`;
