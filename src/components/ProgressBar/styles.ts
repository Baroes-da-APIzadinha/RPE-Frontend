import styled, { css } from "styled-components";

export const ProgressBarWrapper = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.border.radius.full};
  height: 1.2rem;
  position: relative;
  margin: 0.5rem 0;
`;

export const Progress = styled.div<{
  $value: number;
  $color?: string;
}>`
  ${({ $value, $color, theme }) => css`
    width: ${Math.min(Math.max($value, 0), 100)}%;
    background: ${$color || theme.colors.secondary};
    height: 100%;
    border-radius: ${theme.border.radius.full};
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  `}
`;

export const ProgressLabel = styled.span`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: ${({ theme }) => theme.font.sizes.small};
  color: ${({ theme }) => theme.colors.black};
  font-weight: ${({ theme }) => theme.font.bold};
`;
