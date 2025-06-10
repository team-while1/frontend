import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://kunnect.co.kr',
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

    const strippedUrl = config.url.startsWith('/api')
      ? config.url.slice(4)
      : config.url;

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

    if (token && !isPublicRequest) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('loginUser');
      alert('세션이 만료되었습니다. 다시 로그인해주세요.');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;