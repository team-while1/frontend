// src/api/auth.js
import axios from './axiosInstance';

export const login = (email, password) => 
  axios.post('/api/login', { email, password });

export const logout = () =>
  axios.post('/api/logout'); // 토큰은 axiosInstance에서 자동 포함

export const signUp = (data) =>
  axios.post('/api/signup', data);

export const getMember = () => 
  axios.get('/api/member');