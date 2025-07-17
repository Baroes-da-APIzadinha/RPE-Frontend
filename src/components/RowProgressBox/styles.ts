import styled from "styled-components";

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.surface.default};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1.6rem;
  border-radius: ${({ theme }) => theme.border.radius.medium};
  width: 100%;
  margin-bottom: 1.6rem;
`;

export const BarWrapper = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 0.8rem;
`;


export const Title = styled.h2`
  font-size: ${({ theme }) => theme.font.sizes.large};
  font-weight: ${({ theme }) => theme.font.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  padding-bottom: 0.8rem;
`;

export const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.font.sizes.small};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 0.4rem;
`;

export const Right = styled.div`
  text-align: right;
`;

export const Porcentagem = styled.span<{ $color?: string }>`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ $color, theme }) => $color || theme.colors.primary.default};
`;

export const Label = styled.p`
  font-size: ${({ theme }) => theme.font.sizes.xsmall};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ProgressBar = styled.div`
  height: 8px;
  background: ${({ theme }) => theme.colors.lightGray};
  border-radius: 4px;
  overflow: hidden;
`;

export const Progress = styled.div<{ $value: number; $color?: string }>`
  height: 100%;
  background: ${({ $color, theme }) => $color || theme.colors.text.primary};
  width: ${({ $value }) => Math.min(Math.max($value, 0), 100)}%;
  transition: width 0.3s;
`;
