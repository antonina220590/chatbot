'use client';

import { useEffect, useMemo } from 'react';

import { useThemeStore } from '../stores/useThemeStore';
import { lightTheme, darkTheme } from './antdTheme';
import { ConfigProvider } from 'antd';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const antdTheme = useMemo(
    () => (theme === 'light' ? lightTheme : darkTheme),
    [theme]
  );

  return <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>;
}
