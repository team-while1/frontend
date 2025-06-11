import { useNavigate } from "react-router-dom";
import { signUp } from "../api/auth";
import { toast } from 'react-toastify';

export default function useSignUpHandler({
  email,
  password,
  name,
  college,
  student_num,
  major,
  notAllow,
}) {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (notAllow) return;

    const dataToSend = {
      email,
      password,
      name,
      student_num,
      college,
      major,
    };

    console.log("🛠 최종 전송될 데이터:", dataToSend);

    try {
      await signUp(dataToSend);

      toast.success("회원가입이 완료되었습니다.");
      navigate("/login");
    } catch (err) {
      console.error("❗️회원가입 실패 응답:", err.response?.data || err.message);

      const errorMessage =
        err.response?.data?.message ||
        "회원가입에 실패했습니다. 입력값을 확인해주세요.";

      toast.error(errorMessage);
    }
  };

  return handleSubmit;
}