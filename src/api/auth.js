import axios from './axiosInstance';

export const login = (email, password) => 
    axios.post('/login', {email, password});

export const logout = (token) =>
    axios.post('/logout', {token});

export const signUp = (data) =>
    axios.post('/signup', data);

export const getMember = () => 
  axios.get('/member');