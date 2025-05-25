import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export default function useLoginHandler(email, pw) {
  const navigate = useNavigate();
  const { login } = useUser();

  const handleLogin = () => {
    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));
    if (!savedUser) {
      alert("등록된 회원 정보가 없습니다.");
      return;
    }

    if (email === savedUser.email && pw === savedUser.password) {
      alert("로그인 성공!");
      login(savedUser);
      localStorage.setItem("token", "fake-jwt-token");
      navigate("/");
    } else {
      alert("이메일 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  return handleLogin;
}