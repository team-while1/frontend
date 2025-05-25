import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const { login } = useUser();

  const handleEmail = (e) => {
    const input = e.target.value;
    setEmail(input);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(regex.test(input));
  };

  const handlePw = (e) => {
    const input = e.target.value;
    setPw(input);
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    setPwValid(regex.test(input));
  };

  const handleLogin = () => {
    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (!savedUser) {
      alert("등록된 회원 정보가 없습니다.");
      return;
    }

    if (email === savedUser.email && pw === savedUser.password) {
      alert("로그인 성공!");
      login(savedUser); // ✅ Context에 로그인 정보 저장
      localStorage.setItem("token", "fake-jwt-token"); // 예시용 토큰
      navigate("/");
    } else {
      alert("이메일 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  useEffect(() => {
    setNotAllow(!(emailValid && pwValid));
  }, [emailValid, pwValid]);

  return (
    <div className="page">
      <div className="titleWrap">로그인</div>

      <div className="contentWrap">
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
      </div>

      <div>
        <button
          className="bottomButton"
          onClick={handleLogin}
          disabled={notAllow}
        >
          로그인
        </button>
      </div>

      <div className="find">
        <button onClick={() => navigate("/signup")}>회원가입</button>
        <button onClick={() => navigate("/find")}>아이디/비밀번호 찾기</button>
      </div>
    </div>
  );
}