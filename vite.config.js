import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['msw'], // ✅ msw를 Vite가 인식하도록 포함
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://kunnect.co.kr',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '') // ✅ 이 부분 추가
      }
    }
  }
});