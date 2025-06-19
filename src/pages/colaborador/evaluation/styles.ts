import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Main = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacings.large};
  background-color: ${({ theme }) => theme.colors.background};
  overflow-y: auto;
  padding-top: ${({ theme }) => theme.spacings.small};
`;

export const SubmitButton = styled.button`
  background: ${({ theme }) => theme.colors.primary.default};
  color: ${({ theme }) => theme.colors.primary.onPrimary};
  border: none;
  border-radius: 0.5rem;
  padding: 0.9rem 2.2rem;
  font-size: ${({ theme }) => theme.font.sizes.medium};
  font-weight: 600;
  cursor: pointer;
  margin: 2rem auto 0 auto;
  display: block;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.primary.hover};
  }
`;
