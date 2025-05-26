import { useNavigate } from "react-router-dom";

export default function useSignUpHandler({ email, pw, name, school, studentId, major, notAllow }) {
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (notAllow) return;

    localStorage.setItem('registeredUser', JSON.stringify({
      email,
      password: pw,
      name,
      school,
      studentId,
      major,
    }));

    alert('회원가입이 완료되었습니다.');
    navigate('/login');
  };

  return handleSubmit;
}