import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { login } from '../api/auth';
import { useState } from "react";

// JWT 토큰 페이로드를 디코딩하는 유틸리티 함수
// 이 함수는 보통 별도의 유틸리티 파일(예: utils/jwt.js)에 정의하는 것이 좋습니다.
function parseJwt(token) {
    if (!token) return null;
    try {
        const base64Url = token.split('.')[1]; // 페이로드 부분
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("JWT 토큰 디코딩 실패:", e);
        return null;
    }
};


export default function useLoginHandler(email, password) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login: setUserInfo } = useUser();

  const handleLogin = async () => {
    console.log('로그인 시도');
    setIsSubmitting(true);
    try {
      const res = await login(email, password);

      console.log('서버 응답:', res); // 여기서 accessToken 나오면 성공

      const { accessToken, refreshToken } = res.data;

      if (!accessToken || !refreshToken) {
        throw new Error("서버 응답에 필수 로그인 정보가 누락되었습니다!");
      }

      const decodedToken = parseJwt(accessToken);

      const userInfo = {
        // JWT 페이로드에서 직접 가져오는 경우 (decodedToken?.필드명)
        id: decodedToken?.id || decodedToken?.userId || decodedToken?.sub, // ✨ JWT 페이로드에서 ID를 가져오기 (가장 흔한 필드는 'sub' 또는 'id'입니다)
        email: decodedToken?.email || decodedToken?.sub || email, // 'email' 또는 'sub' 필드 사용
        name: decodedToken?.name, // JWT 페이로드에 name이 있다면 가져오기
        student_num: decodedToken?.student_num, // JWT 페이로드에 있다면 가져오기
        college: decodedToken?.college,
        major: decodedToken?.major,

        accessToken: accessToken,
        refreshToken: refreshToken,
      };


      // 파싱된 사용자 정보가 유효한지 다시 확인
      if (!userInfo.id || !userInfo.email) {
          throw new Error("토큰에서 필수 사용자 정보를 추출할 수 없습니다.");
      }

      // 토큰 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setUserInfo(userInfo);

      localStorage.setItem("loginUser", JSON.stringify(userInfo)); // 로컬 스토리지에 사용자 정보 저장

      console.log("서버 응답 전체:", res.data);
      alert('로그인 성공!');
      // 이동
      navigate("/");

    } catch (err) {
      console.error("로그인 처리 중 에러 발생: ", err);

      let errorMessage = "로그인 실패 : 이메일 또는 비밀번호를 확인해주세요.";
      if (err.response) {
        console.error("서버 응답 오류:", err.response.data);
        if (err.response.status === 401) {
          errorMessage = "로그인 실패: 이메일 또는 비밀번호가 일치하지 않습니다.";
        } else if (err.response.data && err.response.data.message) {
          errorMessage = `로그인 실패: ${err.response.data.message}`;
        }
      } else if (err.request) {
          errorMessage = "로그인 실패: 서버에 연결할 수 없습니다. 네트워크를 확인해주세요";
      } else {
          errorMessage = `로그인 처리 중 알 수 없는 오류 발생: ${err.message}`;
      }
      alert(errorMessage);

    } finally {
      setIsSubmitting(false);
    }
  };
  return handleLogin;
}