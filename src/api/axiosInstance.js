import axios from 'axios';

const instance = axios.create({
  baseURL: '', // /api ✅ 실제 서버 주소로 직접 접근 https://kunnect.co.kr/api
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

    // ✅ baseURL('/api') 제외하고 경로 비교
    const strippedUrl = config.url.replace(/^\/api/, '');
    const isPublicRequest = [
      // '/find/id',
      '/find/pw-change',
      '/check-email',
      '/check-name'
    ].some((url) => strippedUrl.includes(url));

    if (token && !isPublicRequest) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('🔐 토큰 포함 요청:', config.headers);
    } else {
      console.log('🔓 공개 요청:', config.url);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ 응답 인터셉터 설정
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 Unauthorized → 세션 만료 처리
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      alert('세션이 만료되었습니다. 다시 로그인해주세요.');
      window.location.href = '/login'; // 로그인 페이지로 이동
    }
    return Promise.reject(error);
  }
);

export default instance;