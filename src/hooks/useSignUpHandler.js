import { useNavigate } from "react-router-dom";
import {signUp} from "../api/auth";

export default function useSignUpHandler({ email, password, name, college, student_num, major, notAllow }) {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (notAllow) return;
    const dataToSend = { // 전송할 데이터를 명시적인 객체로 생성
      email,
      password,
      name,
      student_num,
      college, 
      major,
    };

    console.log("🛠 최종 전송될 데이터:", dataToSend); // 🚨 이 로그를 통해 확인!

    try{
      await signUp({
        email,
        password,
        name,
        student_num,
        college,
        major
      });

      alert('회원가입이 완료되었습니다.');
      navigate('/login');
    } catch(err){
      console.error(err);
      alert('회원가입에 실패했습니다. 입력값을 확인해주세요');
    }
  };

  return handleSubmit;
}
