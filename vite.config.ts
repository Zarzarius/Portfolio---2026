import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import { fileURLToPath } from 'url';

import { cloudflare } from "@cloudflare/vite-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    hmr: true,
  },
  plugins: [tsconfigPaths(), tanstackStart(), react(), cloudflare({
    viteEnvironment: {
      name: "ssr"
    }
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});