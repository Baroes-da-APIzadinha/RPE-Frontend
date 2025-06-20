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
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4vh;
  gap: 1.2rem;
`
export const HeaderButtons = styled.div`
  display: flex;
  gap: 1.2rem;
`
export const CardContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 16px;
  margin-left: 0;
`