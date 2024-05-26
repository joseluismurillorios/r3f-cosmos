import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from "rollup-plugin-visualizer";
import glsl from 'vite-plugin-glsl';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './www'
  },
  plugins: [
    react(),
    glsl(),
    VitePWA({
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Jose Murillo',
        short_name: 'Jose Murillo',
        description: 'Jose Murillo Developer Site',
        orientation: 'portrait-primary',
        display: 'standalone',
        start_url: '/?source=pwa',
        lang: 'en',
        theme_color: '#555555',
        background_color: '#161618',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
    visualizer({ template: 'treemap' }),
  ],
  // build: {
  //   sourcemap: true,
  // },
  server: {
    host: true,
    port: 3000,
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  assetsInclude: ['**/*.glb'],
});
