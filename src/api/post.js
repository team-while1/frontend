import axios from './axiosInstance';

export const createPost = (postData) => {
  return axios.post('/posts', postData);
};