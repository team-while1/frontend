// src/api/axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://kunnect.co.kr',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // 토큰으로 인증하므로 쿠키 사용 안 함
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

    const strippedUrl = config.url.startsWith('/api')
      ? config.url.slice(4)
      : config.url;

    const isPublicRequest = [
      '/find/id',
      '/find/pw-change',
      '/check-email',
      '/check-name'
    ].some((url) => strippedUrl.includes(url));

    if (token && !isPublicRequest) {
      config.headers['Authorization'] = `Bearer ${token}`;

      // 🔐 개발 중에만 클립보드 복사
      if (process.env.NODE_ENV === 'development') {
        console.log("🔑 전체 토큰:", token);
        navigator.clipboard.writeText(token).then(() => {});
      }
    } else {
      console.log('🔓 공개 요청:', config.url);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      alert('세션이 만료되었습니다. 다시 로그인해주세요.');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;