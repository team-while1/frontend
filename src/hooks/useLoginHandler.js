import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { login as loginAPI, getMember } from '../api/auth';
import { useState } from "react";
import { toast } from 'react-toastify';

// JWT 토큰 페이로드를 디코딩하는 함수
function parseJwt(token) {
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("JWT 토큰 디코딩 실패:", e);
    return null;
  }
}

export default function useLoginHandler(email, password) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login: setUserInfo } = useUser();

  const handleLogin = async () => {
    console.log('로그인 시도');
    setIsSubmitting(true);
    try {
      const res = await loginAPI(email, password);
      const { accessToken, refreshToken } = res.data;

      if (!accessToken || !refreshToken) {
        throw new Error("서버 응답에 필수 로그인 정보가 누락되었습니다!");
      }

      const decodedToken = parseJwt(accessToken);
      let userInfo = {
        id: decodedToken?.id || decodedToken?.sub,
        email: decodedToken?.email || decodedToken?.sub || email,
        accessToken,
        refreshToken,
      };

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      if (!userInfo.id || !userInfo.email) {
        throw new Error("토큰에서 필수 사용자 정보를 추출할 수 없습니다.");
      }

      try {
        const memberRes = await getMember();
        userInfo = { ...userInfo, ...memberRes.data };
      } catch (memberError) {
        console.warn("회원 정보 불러오기 실패 (토큰 문제일 수 있음):", memberError);
        // toast.warning("회원 정보 일부를 불러오지 못했습니다."); // 선택사항
      }

      localStorage.setItem("loginUser", JSON.stringify(userInfo));
      setUserInfo(userInfo);

      toast.success('로그인 성공!');
      navigate("/");
    } catch (err) {
      console.error("로그인 처리 중 에러 발생: ", err);

      let errorMessage = "로그인 실패: 이메일 또는 비밀번호를 확인해주세요.";
      if (err.response) {
        console.error("서버 응답 오류:", err.response.data);
        if (err.response.status === 401) {
          errorMessage = "로그인 실패: 이메일 또는 비밀번호가 일치하지 않습니다.";
        } else if (err.response.data?.message) {
          errorMessage = `로그인 실패: ${err.response.data.message}`;
        }
      } else if (err.request) {
        errorMessage = "로그인 실패: 서버에 연결할 수 없습니다. 네트워크를 확인해주세요.";
      } else {
        errorMessage = `로그인 처리 중 알 수 없는 오류 발생: ${err.message}`;
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return handleLogin;
}