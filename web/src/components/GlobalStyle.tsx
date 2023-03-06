import { createGlobalStyle } from 'styled-components';

const _GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default function GlobalStyle() {
  return <_GlobalStyle />;
}
