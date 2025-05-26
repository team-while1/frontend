import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

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
    pw,
    handleEmail,
    handlePw,
    emailValid,
    pwValid,
    notAllow,
  } = useLoginForm();

  const handleLogin = useLoginHandler(email, pw);

  return (
    <div className="page">
      <div className="titleWrap">로그인</div>

      <div className="contentWrap">
        <FormInput
          placeholder="이메일"
          value={email}
          onChange={handleEmail}
        />
        <ErrorMessage
          condition={!emailValid && email.length > 0}
          message="올바른 이메일 형식이 아닙니다."
        />

        <FormInput
          type="password"
          placeholder="비밀번호 (영문, 숫자, 특수문자 포함 8자 이상)"
          value={pw}
          onChange={handlePw}
        />
        <ErrorMessage
          condition={!pwValid && pw.length > 0}
          message="비밀번호 조건을 확인해주세요."
        />
      </div>

      <SubmitButton onClick={handleLogin} disabled={notAllow} />

      <BottomLinkButtons
        onSignUp={() => navigate("/signup")}
        onFind={() => navigate("/find")}
      />
    </div>
  );
}