import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [
    react({
      include: /\.(jsx|js)$/,
    }),
    basicSsl(),
  ],
  envPrefix: ['VITE_', 'REACT_APP_'],
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  build: {
    outDir: 'build',
    sourcemap: false,
    chunkSizeWarningLimit: 5000,
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    https: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    https: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
});
