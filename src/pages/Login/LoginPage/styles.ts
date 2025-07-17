import styled from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
`

export const Form = styled.form`
  background: ${({ theme }) => theme.colors.surface.default};
  padding: 2.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  min-width: 320px;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1.2rem;
  color: ${({ theme }) => theme.colors.primary.default};
`;
