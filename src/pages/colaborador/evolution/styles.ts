import theme from '@/styles/theme'
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${theme.colors.background};
`

export const Main = styled.main`
  flex: 1;
  padding: ${theme.spacings.large};
  background-color: ${theme.colors.background};
  overflow-y: auto;
  padding-top: ${theme.spacings.small}; 
`
