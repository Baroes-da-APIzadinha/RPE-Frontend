import styled from 'styled-components'

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.surface.default};
  border-radius: 1.125rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 340px;
  height: 170px;
  position: relative;
  margin-bottom: 2rem;
  margin-top: 1rem;
`;

export const IconWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.5rem;
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.sizes.small};
  font-weight: 600;
  margin: 0 0 0.7rem 0;
`;

export const BigSpan = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.sizes.xlarge};
  font-weight: 700;
  margin-bottom: 0.7rem;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 16px;
  background: ${({ theme }) => theme.colors.lightGray};
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 0.7rem;
`;

export const Progress = styled.div<{ percent: number }>`
  height: 100%;
  background: ${({ theme }) => theme.colors.black};
  width: ${({ percent }) => percent}%;
  transition: width 0.3s;
`;

export const Span = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1rem;
  margin-bottom: 0.3rem;
`;

export const MiniSpan = styled.span<{ $status?: 'positive' | 'negative' | 'neutral' | 'default' }>`
  color: ${({ theme, $status }) =>
    $status === 'positive'
      ? '#2BBF7F'
      : $status === 'negative'
      ? theme.colors.error.default
      : $status === 'neutral'
      ? theme.colors.text.secondary
      : theme.colors.text.disabled};
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
`;
