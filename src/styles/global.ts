import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    font-family: 'Inter';
  }

  html, body, #__next {
    height: 100%;
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }
`;
