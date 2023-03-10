import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    readonly alt: string;
    fontSize?: string | number;
    padding?: string | number;
    border?: string;
    borderRadius?: string | number;

    colors: {
      default: string;
      primary: string;
      prhover: string;
      container: string;
      text: string;
      button: string;
      btnhover: string;
      header: string;
      opposite: string;
      background: string;
    };
  }
}
