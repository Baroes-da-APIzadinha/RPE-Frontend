import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: inter, sans-serif;

  }
  body {
    font-size: 62.5%;
    min-width: 320px;
    min-height: 100vh;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text.primary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyle;



//   html {
//     font-size: 62.5%;
//     font-family: 'Inter';
//   }

//   html, body, #__next {
//     height: 100%;
//   }
