import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
  alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 5173,
    historyApiFallback: true,
    // proxy: {
    //   '/api': {
    //     target: 'https://kunnect.co.kr',
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace(/^\/api/, '') // ✅ 이 부분 추가
    //   }
    // }
  }
});