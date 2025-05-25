import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './SignUp.css';

export default function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [studentId, setStudentId] = useState('');
  const [major, setMajor] = useState('');

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [pwMatch, setPwMatch] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

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

  const handleConfirmPw = (e) => {
    const input = e.target.value;
    setConfirmPw(input);
    setPwMatch(pw === input);
  };

  useEffect(() => {
    const allFilled = name && school && studentId && major;
    setPwMatch(pw === confirmPw);
    setNotAllow(!(emailValid && pwValid && pwMatch && allFilled));
  }, [emailValid, pwValid, pw, confirmPw, name, school, studentId, major]);

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

  return (
    <div className="page page-signup">
      <div className="titleWrap">회원가입</div>

      <div className="contentWrap">
        <div className="inputWrap">
          <input
            type="text"
            className="input"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </div>

        <div className="inputWrap">
          <input
            type="text"
            className="input"
            placeholder="대학교"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />
        </div>

        <div className="inputWrap">
          <input
            type="text"
            className="input"
            placeholder="학번"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </div>

        <div className="inputWrap">
          <input
            type="text"
            className="input"
            placeholder="학과"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
          />
        </div>
        <hr className="line" />
        <div className="inputWrap">
          <input
            type="text"
            className="input"
            placeholder="이메일"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className="errorMessageWrap">
          {!emailValid && email.length > 0 && <div>올바른 이메일 형식을 입력하세요.</div>}
        </div>

        <div className="inputWrap">
          <input
            type="password"
            className="input"
            placeholder="비밀번호 (영문, 숫자, 특수문자 포함 8자 이상)"
            value={pw}
            onChange={handlePw}
          />
        </div>
        <div className="errorMessageWrap">
          {!pwValid && pw.length > 0 && <div>비밀번호 조건을 확인해주세요.</div>}
        </div>

        <div className="inputWrap">
          <input
            type="password"
            className="input"
            placeholder="비밀번호 확인"
            value={confirmPw}
            onChange={handleConfirmPw}
          />
        </div>
        <div className="errorMessageWrap">
          {!pwMatch && confirmPw.length > 0 && <div>비밀번호가 일치하지 않습니다.</div>}
        </div>
      </div>

      <div>
        <button onClick={handleSubmit} disabled={notAllow} className="bottomButton">
          확인
        </button>
      </div>
    </div>
  );
}