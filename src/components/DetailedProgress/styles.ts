import styled from "styled-components";

export const Container = styled.div`
  padding: 1.6rem;
  border-radius: 1.125rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface.default};
`;

export const Header = styled.div`
  /* display: flex; */
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.font.sizes.large};
  font-weight: ${({ theme }) => theme.font.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Toggle = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.lightGray};
  border-radius: 0.6rem;
`;

export const ToggleButton = styled.button<{ active: boolean }>`
  padding: 0.4rem 1rem;
  border: none;
  background: ${({ theme, active }) =>
    active ? theme.colors.surface.default : "transparent"};
  font-weight: ${({ theme }) => theme.font.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: 0.5rem;
  cursor: pointer;
`;

export const List = styled.div`
  margin-top: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const Item = styled.div``;

export const Label = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: ${({ theme }) => theme.font.sizes.small};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0.2rem;
`;

export const BarContainer = styled.div`
  width: 100%;
  height: 10px;
  background: ${({ theme }) => theme.colors.lightGray};
  border-radius: 1rem;
  overflow: hidden;
`;

export const BarFill = styled.div<{ percent: number }>`
  width: ${({ percent }) => percent}%;
  height: 100%;
  background: ${({ theme }) => theme.colors.black};
  transition: width 0.3s ease;
`;

export const Value = styled.div`
  margin-top: 0.2rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: right;
`;
