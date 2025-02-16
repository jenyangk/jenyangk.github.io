import MillionLint from '@million/lint';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  base: '/jenyangk.github.io/',
  plugins: [MillionLint.vite({
    enabled: true
  }), react()],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
});
