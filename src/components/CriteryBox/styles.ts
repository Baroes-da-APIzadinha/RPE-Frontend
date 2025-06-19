import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.surface.default};
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1.5rem 2rem;
  margin-bottom: 1.5rem;
  width: 100%;
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
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const Label = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.sizes.small};
  margin-right: 0.5rem;
`;

export const StarButton = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.secondary.default : theme.colors.lightGray};
  font-size: 1.7rem;
  transition: color 0.2s;
  padding: 0;
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
  resize: None;
  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.surface.alt};
`;

export const CollapseButton = styled.button<{ collapsed: boolean }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 2;
  padding: 0.2rem;
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  transform: rotate(${({ collapsed }) => (collapsed ? '180deg' : '0deg')});
    &:hover {
        color: ${({ theme }) => theme.colors.text.primary};
    }
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
