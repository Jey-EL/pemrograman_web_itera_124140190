import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// base './' + HashRouter => aplikasi aman dibuka dari sub-folder GitHub Pages
export default defineConfig({
  base: './',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
});
