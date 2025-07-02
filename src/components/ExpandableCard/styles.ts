import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.surface.default};
  border-radius: ${({ theme }) => theme.border.radius.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 1rem;
  padding: 2rem;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.2rem;
  }
`;

export const HeaderContent = styled.div`
  flex: 1;
`;

export const DropButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.4rem;
  display: flex;
  align-items: center;
`;

export const Body = styled.div<{ $withBorderTop: boolean }>`
  display: flex;
  flex-direction: column;
  margin-top: 1.2rem;
  padding-top: 1.2rem;
  gap: 1.2rem;
  border-top: ${({ $withBorderTop, theme }) =>
    $withBorderTop ? `1px solid ${theme.colors.border}` : "none"};
`;
