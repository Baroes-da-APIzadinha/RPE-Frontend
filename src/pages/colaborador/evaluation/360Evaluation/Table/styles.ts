import styled from "styled-components";



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
