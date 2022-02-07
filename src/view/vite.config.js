import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  root: __dirname,
  base: '{{DIST}}',
  plugins: [
    vue(),
  ],
  build: {
    minify: false,
    emptyOutDir: true,
    outDir: '../../out/view',
    polyfillModulePreload: false,
    rollupOptions: {
      output: {
        // Without hash-name for VSCode Webview hot Reload-Webviews
        entryFileNames: 'assets/[name].js',
      },
    },
  },
});
