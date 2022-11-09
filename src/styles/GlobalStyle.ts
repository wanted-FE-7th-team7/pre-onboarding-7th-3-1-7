import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`${reset}
  *{
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }
  body, html, #root {
    width: 100vw;
    height: 100vh;
  }
`;

export default GlobalStyle;
