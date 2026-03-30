/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [react(), tailwindcss()],
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'html', 'json-summary'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.ts?(x)',
        'src/**/*.unit.test.ts?(x)',
        'src/**/*.int.test.ts?(x)',
        'src/setup*.ts',
        'src/vite-env.d.ts',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 70,
        statements: 80,
      },
    },
    projects: [
      {
        extends: true,
        test: {
          globals: true,
          name: 'Unit_Tests',
          root: 'src',
          environment: 'jsdom',
          setupFiles: ['setup.unit.ts'],
          include: ['**/*.unit.test.ts?(x)'],
        },
      },
      {
        extends: true,
        test: {
          globals: true,
          name: 'Integration_Tests',
          root: 'src/__tests__/integration',
          environment: 'jsdom',
          setupFiles: ['setup.integration.ts'],
          include: ['**/*.int.test.ts?(x)'],
        },
      },
    ],
  },
});
