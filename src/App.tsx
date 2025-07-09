import AppRoutes from "./router";
import theme from "./styles/theme";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/global";
import { Toaster } from "sonner";
import { PerfilProvider } from "./contexts/PerfilContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <PerfilProvider>
        <Toaster position="top-right" richColors />
        <GlobalStyle />
        <AppRoutes />
      </PerfilProvider>
    </ThemeProvider>
  );
}

export default App;
