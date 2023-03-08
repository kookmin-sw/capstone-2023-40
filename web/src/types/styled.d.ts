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
      container: string;
      text: string;
      button: string;
      background: string;
      opposite: string;
    };
  }
}
