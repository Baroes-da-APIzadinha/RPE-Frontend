import styled from "styled-components";

export const ProgressCard = styled.div`
  background: ${({ theme }) => theme.colors.surface.default};
  padding: 1.6rem;
  border-radius: ${({ theme }) => theme.border.radius.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 1.6rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.font.sizes.large};
  font-weight: ${({ theme }) => theme.font.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.font.sizes.small};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 0.4rem;
`;

export const Right = styled.div`
  text-align: right;
`;

export const Porcentagem = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary.default};
`;

export const Label = styled.p`
  font-size: ${({ theme }) => theme.font.sizes.xsmall};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ProgressBar = styled.div`
  height: 8px;
  background: ${({ theme }) => theme.colors.lightGray};
  border-radius: 4px;
  margin-top: 1rem;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.colors.text.primary};
  border-radius: 4px;
`;

export const SummaryRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const SummaryBox = styled.div`
  flex: 1;
  padding: 1.2rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.border.radius.medium};
  background: ${({ theme }) => theme.colors.surface.default};
  text-align: center;
`;

export const SummaryValue = styled.div<{ color?: string }>`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ color, theme }) => color || theme.colors.text.primary};
`;

export const SummaryLabel = styled.div`
  font-size: ${({ theme }) => theme.font.sizes.small};
  color: ${({ theme }) => theme.colors.text.secondary};
`;
