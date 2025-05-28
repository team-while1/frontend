import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import {login} from '../api/auth';
import { useState } from "react";

export default function useLoginHandler(email, password) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    console.log('로그인 시도');
    setIsSubmitting(true);
    try{
      const res = await login(email, password);
      console.log(res); // 여기서 accessToken 나오면 성공
      const { accessToken, refreshToken } = res.data;

      //토근 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    
      alert('로그인 성공!');
      //이동

      navigate("/mypage");
    }catch(err){
      alert("로그인 실패 : 이메일 또는 비밀번호를 확인해주세요.");
      console.error(err);
    } finally{
      setIsSubmitting(false);
    }
  };
  return handleLogin;
}



//     const savedUser = JSON.parse(localStorage.getItem("registeredUser"));
//     if (!savedUser) {
//       alert("등록된 회원 정보가 없습니다.");
//       return;
//     }

//     if (email === savedUser.email && pw === savedUser.password) {
//       alert("로그인 성공!");
//       login(savedUser);
//       localStorage.setItem("token", "fake-jwt-token");
//       navigate("/");
//     } else {
//       alert("이메일 또는 비밀번호가 일치하지 않습니다.");
//     }
//   };

//   return handleLogin;
// }