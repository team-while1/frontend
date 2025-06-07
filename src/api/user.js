// src/api/user.js
import axios from './axiosInstance';

export function updateUserInfo(data) {
  // data는 변경된 필드만 포함될 수 있습니다.
  return axios.put('/auth/member', data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
}

// ⭐️ 변경: File 객체를 포함하는 FormData를 받도록 수정
export function updateProfileImage(formData) {
  // ⚠️ 수정된 부분: 프로필 이미지 업데이트 API 경로를 수정했습니다.
  return axios.put(
    "/auth/profile", // ⭐️ 이 경로를 백엔드 API 문서 또는 백엔드 개발자에게 확인해주세요!
    formData, // FormData 객체 직접 전송
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        // 'Content-Type': 'multipart/form-data' 헤더는 FormData 사용 시 axios가 자동으로 설정합니다.
      },
    }
  );
}