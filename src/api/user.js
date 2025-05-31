// src/api/user.js
import axios from './axiosInstance';

export function updateUserInfo(data) {
  return axios.put('/api/auth/member', data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
}

export function updateProfileImage(profileImage) {
  return axios.put(
    "/api/auth/member/profile",
    { profile_image: profileImage },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
}