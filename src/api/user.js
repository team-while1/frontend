import axios from './axiosInstance';

export const updateUserInfo = (data) => {
  return axios.put('/api/auth/member', data);
};

export const updateProfileImage = async (data) => { // data는 { image: Base64String } 형태의 JSON 객체
    try {
        const response = await axios.put('/api/auth/member/profile', data, {
            headers: {
                'Content-Type': 'application/json' 
            }
        });
        return response;
    } catch (error) {
        console.error("Failed to update profile image:", error);
        throw error; // 에러를 다시 throw하여 호출하는 쪽에서 처리할 수 있도록 함
    }
};
