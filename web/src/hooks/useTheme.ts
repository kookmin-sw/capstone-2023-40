import { useEffect, useState } from 'react';

import { DefaultTheme } from 'styled-components';

import { lightTheme, darkTheme } from '../themes';

/**
 * Custom hook for detecting local theme mode.
 * Detects system default color scheme and stores it in the local storage when mode changed.
 *
 * @returns Current mode in `DefaultTheme` and a function that can change its state.
 */
export const useTheme = (): [DefaultTheme, () => void] => {
  const getSystemDefaultMode = (): string =>
    window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

  const [themeMode, setThemeMode] = useState<string>(getSystemDefaultMode);
  const [theme, setTheme] = useState<DefaultTheme>(lightTheme);

  const setLocalMode = (mode: string) => {
    window.localStorage.setItem('theme', mode);
    setThemeMode(mode);
  };

  const toggleTheme = () => {
    themeMode === 'light' ? setLocalMode('dark') : setLocalMode('light');
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setThemeMode(localTheme);
  }, []);

  useEffect(() => {
    setTheme(themeMode === 'light' ? lightTheme : darkTheme);
  }, [themeMode]);

  return [theme, toggleTheme];
};
