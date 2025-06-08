import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { login } from '../api/auth';

import useLoginForm from "../hooks/useLoginForm";
import useLoginHandler from "../hooks/useLoginHandler";

import FormInput from "../components/FormInput";
import ErrorMessage from "../components/ErrorMessage";
import SubmitButton from "../components/SubmitButton";
import BottomLinkButtons from "../components/BottomLinkButtons";

export default function Login() {
  const navigate = useNavigate();

  const {
    email,
    password,
    handleEmail,
    handlePw,
    emailValid,
    pwValid,
    notAllow,
  } = useLoginForm();

  const handleLogin = useLoginHandler(email, password);

  const handleKeyDown = (e) => {
    if(e,key === 'Enter'){
      e.preventDefault();
      if(!notAllow) handleLogin();
    }
  };
  return (
    <div className="login-page" onKeyDown={handleKeyDown}>
      <div className="titleWrap">로그인</div>

      <div className="contentWrap">
        {/* 이메일 입력 필드 */}
        <FormInput
          placeholder="이메일"
          value={email}
          onChange={handleEmail}
        />
        {/* 이메일 유효성 검사 에러 메시지 */}
        <ErrorMessage
          condition={!emailValid && email?.length > 0} // email이 undefined나 null이 아니면 length를 읽음
          message="올바른 이메일 형식이 아닙니다."
        />

        {/* 비밀번호 입력 필드 */}
        <FormInput
          type="password"
          placeholder="비밀번호 (영문, 숫자, 특수문자 포함 8자 이상)"
          value={password}
          onChange={handlePw}
        />
        {/* 비밀번호 유효성 검사 에러 메시지 */}
        <ErrorMessage
          condition={!pwValid && password?.length > 0}
          message="비밀번호 조건을 확인해주세요."
        />

      </div>

      {/* 제출 버튼 */}
      <SubmitButton onClick={handleLogin} disabled={notAllow} />

      {/* 하단 링크 버튼들 */}
      <BottomLinkButtons
        onSignUp={() => navigate("/signup")}
        onFind={() => navigate("/find")}
      />
    </div>
  );
}
