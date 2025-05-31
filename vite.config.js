import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://kunnect.co.kr',
        changeOrigin: true,
        secure: false, // HTTPS 인증서 이슈 있을 경우 필요
      }
    }
  }
});