import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import VueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig({
  plugins: [vue(), VueDevTools()],
  ssr: {
    noExternal: ['primevue', '@primeuix/themes/aura', 'quill'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: true,
    watch: {
      usePolling: true,
    },
    port: 5173,
  },
  test: {
    include: ['tests/unit/**/*.spec.ts'],
    environment: 'jsdom',
  },
});
