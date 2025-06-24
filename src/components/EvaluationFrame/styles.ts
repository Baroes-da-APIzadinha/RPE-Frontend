import styled from "styled-components";

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.surface.default};
  border-radius: ${({ theme }) => theme.border.radius.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2rem 2.5rem;
  margin-top: 2rem;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.6rem;
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text.title};
  font-size: ${({ theme }) => theme.font.sizes.large};
  font-weight: ${({ theme }) => theme.font.bold};
`;

export const CountContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.light};
  color: ${({ theme }) => theme.colors.primary.default};
  font-weight: ${({ theme }) => theme.font.bold};
  font-size: ${({ theme }) => theme.font.sizes.xsmall};
  padding: 0.4rem 0.8rem;
  border-radius: 0.4rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
