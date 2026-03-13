import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // Permite JSX en archivos .js
      include: '**/*.{jsx,js}',
    }),
  ],
  envPrefix: 'REACT_APP_',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  build: {
    outDir: 'build',
    sourcemap: false,
    // Evita errores de memoria en builds grandes
    chunkSizeWarningLimit: 5000,
  },
  server: {
    port: 3000,
  },
  esbuild: {
    // Trata todos los .js como JSX
    loader: 'jsx',
    include: /src\/.*\.js$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
});
