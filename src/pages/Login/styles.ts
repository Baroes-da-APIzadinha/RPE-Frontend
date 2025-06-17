import styled from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
`

export const Form = styled.form`
  background: ${({ theme }) => theme.colors.primary.onPrimary};
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

export const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1;
`;

export const Subtitle = styled.p`
  margin: 0.3rem 0 0 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.1rem;
  font-weight: 400;
  line-height: 1.2;
`

export const Label = styled.label`
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1rem;
`

export const Input = styled.input`
  padding: 0.75rem 1rem;
  margin-bottom: 1.25rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.surface.alt};
  color: ${({ theme }) => theme.colors.text.primary};
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.default};
    outline: none;
  }
`

export const Button = styled.button`
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.button.default};
  color: ${({ theme }) => theme.colors.primary.onPrimary};
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.primary.hover};
  }
`
