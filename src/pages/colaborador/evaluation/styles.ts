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
