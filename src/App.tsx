import AppRoutes from "./router";
import theme from "./styles/theme";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/global";
import { Toaster } from "sonner";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Toaster position="top-left" richColors />
      <GlobalStyle />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
