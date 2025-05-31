import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

instance.interceptors.request.use((config)=>{
    const token = localStorage.getItem('accessToken');
    if(token){
        config.headers['Authorization'] = `Bearer ${token}`;
        console.log(config.headers);
      }
    return config;
},
(error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 401 Unauthorized 에러 발생 시 토큰 만료로 간주하고 로그인 페이지로 리다이렉트
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      alert('세션이 만료되었습니다. 다시 로그인해주세요.');
      window.location.href = '/login'; // navigate 대신 window.location.href 사용 (React Router 밖에서)
    }
    return Promise.reject(error);
  }
);

export default instance;