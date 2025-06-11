import axios from './axiosInstance';

export const createPost = (postData) => {
  return axios.post('/api/posts', {
    ...postData,
    status: 'RECRUITING', // 또는 ENDED
  });
};