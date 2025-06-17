import AppRoutes from './router'
import theme from './styles/theme'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from './styles/global'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App
