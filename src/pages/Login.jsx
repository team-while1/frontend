import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { login } from '../api/auth';
import useLoginForm from "../hooks/useLoginForm";
import useLoginHandler from "../hooks/useLoginHandler";
import FormInput from "../components/FormInput";
import ErrorMessage from "../components/ErrorMessage";
import SubmitButton from "../components/SubmitButton";
import BottomLinkButtons from "../components/BottomLinkButtons";
import PageLayout from "../components/PageLayout";

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

  return (
    <div className="login-page">
      <div className="titleWrap">로그인</div>

      <div className="contentWrap">
        <FormInput
          placeholder="이메일"
          value={email}
          onChange={handleEmail}
        />
        <ErrorMessage
          condition={!emailValid && email?.length > 0} // email이 undefined나 null이 아니면 length를 읽음
          message="올바른 이메일 형식이 아닙니다."
        />

        <FormInput
          type="password"
          placeholder="비밀번호 (영문, 숫자, 특수문자 포함 8자 이상)"
          value={password}
          onChange={handlePw}
        />
        <ErrorMessage
          condition={!pwValid && password?.length > 0}
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


{/* =======
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="이메일"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className="errorMessageWrap">
          {!emailValid && email.length > 0 && (
            <div>올바른 이메일 형식이 아닙니다.</div>
          )}
        </div>

        <div className="inputWrap">
          <input
            className="input"
            type="비밀번호"
            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
            value={pw}
            onChange={handlePw}
          />
        </div>
        <div className="errorMessageWrap">
          {!pwValid && pw.length > 0 && (
            <div>비밀번호 조건을 확인해주세요.</div>
          )}
        </div>
>>>>>>> main */}
