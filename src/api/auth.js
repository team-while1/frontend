import axios from './axiosInstance';

export const login = (email, password) => 
    axios.post('/api/login', {email, password});

export const logout = (token) =>
    axios.post('/api/logout', {token});

export const signUp = (data) =>
    axios.post('/api/signup', data);

export const getMember = () => 
  axios.get('/api/member');