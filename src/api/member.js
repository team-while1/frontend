import axios from './axiosInstance';

export const getMemberInfo = () => axios.get('/member');

export const updateProfile = (data) =>
  axios.put('/member/profile', data);

export const resetProfileImage = () =>
  axios.put('/member/profile/basic');

export const deleteMember = (memberId, password) =>
  axios.delete(`/member/${memberId}`, {
    data: { password },
  });