import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://kunnect.co.kr',
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

    // /api/ 접두사 제거
    const strippedUrl = config.url.startsWith('/api')
      ? config.url.slice(4)
      : config.url;

    // 인증 없이 허용되는 공개 경로
    const publicPaths = [
      '/find/id',
      '/find/pw-change',
      '/check-email',
      '/check-name',
      '/auth/login',
      '/auth/signup',
      '/posts',
    ];

    const isPublicRequest = publicPaths.some((url) =>
      strippedUrl.startsWith(url)
    );

    // 인증 필요 요청에 토큰 부착
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 인증 만료 시 처리
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('loginUser');
      alert('세션이 만료되었습니다. 다시 로그인해주세요.');
      window.location.href = '/login';
    }

    // 서버 에러 처리 로그
    console.error("❌ axios 응답 에러:", {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
    });

    return Promise.reject(error);
  }
);

export default instance;