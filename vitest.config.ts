import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',

      include: ['app/**/*.{ts,tsx}'],

      exclude: [
        'app/**/*.test.{ts,tsx}',
        'app/**/*.spec.{ts,tsx}',
        'app/utils/AntdRegistry.tsx',
        'app/layout.tsx',
        'app/page.tsx',
        'vitest.setup.ts',
        'vitest.config.ts',
        'app/utils/themeProvider.tsx',
        'app/utils/antdTheme.ts',
        'app/globals.css',
        '**/node_modules/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
