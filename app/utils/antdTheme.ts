import type { ThemeConfig } from 'antd';
import { theme } from 'antd';

export const lightTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorBgElevated: '#f2f2f7',
  },
};

export const darkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorBgElevated: '#2C2C2E',
  },
};
