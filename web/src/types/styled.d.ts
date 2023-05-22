import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    readonly alt: string;
    fontSize?: string | number;
    padding?: string | number;
    border?: string;
    borderResultList?: string;
    borderRadius?: string | number;
    themeToggle?: string | number;
    iconInvert?: string;

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
      inputBackground: string;
      placeHolder: string;
    };
  }
}
