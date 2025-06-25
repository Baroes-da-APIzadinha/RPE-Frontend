import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;
`

export const Label = styled.label`
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1rem;
`

export const Input = styled.input<{ error?: boolean }>`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ error, theme }) =>  error ? theme.colors.error.default : theme.colors.border};

  border-radius: 6px;
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.surface.alt};
  color: ${({ theme }) => theme.colors.text.primary};
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.default};
    outline: none;
  }
`
