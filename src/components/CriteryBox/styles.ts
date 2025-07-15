import styled from "styled-components";

export const Container = styled.div<{ error?: boolean }>`
  position: relative;
  background: ${({ theme }) => theme.colors.surface.default};
  border-radius: 1rem;
  border: 1px solid ${({ error, theme }) =>
    error ? theme.colors.error.default : theme.colors.border};
  padding: 1.5rem 2rem;
  margin-bottom: 1.5rem;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1.2rem 1.4rem;
  }
`;


export const Header = styled.div`
  margin-bottom: 1rem;
`;

export const Title = styled.h4`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.sizes.medium};
  font-weight: 700;
  margin-bottom: 0.2rem;
`;

export const Subtitle = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.font.sizes.small};
`;

export const RatingRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;


export const Label = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.sizes.small};
  margin-right: 0.5rem;
`;


export const Score = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.1rem;
  font-weight: 600;
  margin-left: 0.7rem;
`;

export const JustificationArea = styled.textarea`
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.7rem;
  font-size: ${({ theme }) => theme.font.sizes.small};
  margin-bottom: 1rem;
  resize: none;
  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.surface.alt};

  &:disabled {
    background: ${({ theme }) => theme.colors.lightGray};
    color: ${({ theme }) => theme.colors.text.secondary};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;



export const HeaderDiv = styled.div`

  display: flex;
  flex: 1;
  justify-content: space-between;

`;

export const CollapseButton = styled.button<{ collapsed: boolean }>`
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 2;
  padding: 0.2rem;
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
    &:hover {
        color: ${({ theme }) => theme.colors.text.primary};
    }
`;

export const NotaBadge = styled.span<{ $visible?: boolean }>`
  display: ${({ $visible }) => ($visible === false ? 'none' : 'inline-flex')};
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 .5rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary.light};
  color: ${({ theme }) => theme.colors.primary.default};
  font-weight: ${({ theme }) => theme.font.bold};
  font-size: 1rem;
  margin-right: 2rem;
`;


export const JustificationLabel = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.sizes.small};
  font-weight: 600;
  margin-bottom: 0.3rem;
`;

export const Content = styled.div<{ collapsed: boolean }>`
  max-height: ${({ collapsed }) => (collapsed ? '0' : '1000px')};
  opacity: ${({ collapsed }) => (collapsed ? 0 : 1)};
  overflow: hidden;
  transition: max-height 1s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: max-height, opacity;
`;
