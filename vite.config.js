import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      include: /\.(jsx|js)$/,
    }),
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
    port: 3000,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
});
