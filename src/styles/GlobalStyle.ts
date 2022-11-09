import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
 ${reset}
html {
  font-size: 62.5%;
  box-sizing : border-box;
}

strong {
	font-weight: 700;
}
`;
export default GlobalStyle;
