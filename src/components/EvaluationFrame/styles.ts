import styled from "styled-components";

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.surface.default};
  border-radius: 1.125rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2rem 2.5rem;
  margin-top: 2rem;
  width: 100%;
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.sizes.large};
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
