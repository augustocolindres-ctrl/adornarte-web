import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Permite usar REACT_APP_ igual que antes
  envPrefix: 'REACT_APP_',
  build: {
    outDir: 'build',
    sourcemap: false,
  },
  server: {
    port: 3000,
  },
});
