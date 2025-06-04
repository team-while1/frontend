import "../styles/SignUp.css";
import FormInput from "../components/FormInput";
import ErrorMessage from "../components/ErrorMessage";
import SubmitButton from "../components/SubmitButton";
import useSignUpForm from "../hooks/useSignUpForm";
import useSignUpHandler from "../hooks/useSignUpHandler";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { signUp } from "../api/auth";

export default function SignUp() {
  // navigate 훅을 사용하여 navigate 함수를 정의합니다.
  const navigate = useNavigate();

  const {
    email,
    password,
    confirmPw,
    name,
    college,
    student_num,
    major,
    handleEmail,
    handlePw,
    handleConfirmPw,
    setName,
    setCollege,
    setStudent_num,
    setMajor,
    emailValid,
    pwValid,
    pwMatch,
    notAllow,
  } = useSignUpForm();

  const handleSubmit = useSignUpHandler({
    email,
    password,
    name,
    college,
    student_num,
    major,
    notAllow,
    navigate, // navigate 함수를 useSignUpHandler 훅에 전달합니다.
  });


  return (
    <div className="page page-signup">
      <div className="titleWrap">회원가입</div>
      <div className="contentWrap">
        {/* 이름 입력 필드 */}
        <FormInput
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* 단과대 선택 드롭다운 */}
        <div className="inputWrap">
          <select
            className={`input ${college === "" ? "placeholder" : ""}`}
            value={college}
            onChange={(e) => setCollege(e.target.value)}
          >
            {/* 기본 옵션: 사용자가 선택하지 않으면 빈 문자열이 전송될 수 있음을 명확히 함 */}
            <option value="" disabled hidden>단과대 선택</option>
            <option value="융합기술대학">융합기술대학</option>
            <option value="공과대학">공과대학</option>
            <option value="인문대학">인문대학</option>
          </select>
          {/* 단과대를 선택하지 않았을 때의 에러 메시지 (선택 사항) */}
          {college === "" && !notAllow && <ErrorMessage message="단과대를 선택해주세요." />}
        </div>
        {/* 학번 입력 필드 */}
        <FormInput
          placeholder="학번"
          value={student_num}
          onChange={(e) => setStudent_num(e.target.value)}
        />
        {/* 학과 입력 필드 */}
        <FormInput
          placeholder="학과"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />

        <hr className="line" /> {/* 구분선 */}

        {/* 이메일 입력 필드 */}
        <FormInput placeholder="이메일" value={email} onChange={handleEmail} />
        {/* 이메일 유효성 검사 에러 메시지 */}
        <ErrorMessage
          condition={!emailValid && typeof email === "string" && email.length > 0}
          message="올바른 이메일 형식을 입력하세요."
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
        {/* 비밀번호 확인 입력 필드 */}
        <FormInput
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPw}
          onChange={handleConfirmPw}
        />
        {/* 비밀번호 일치 여부 에러 메시지 */}
        <ErrorMessage
          condition={!pwMatch && confirmPw.length > 0}
          message="비밀번호가 일치하지 않습니다."
        />
      </div>

      {/* 회원가입 제출 버튼 */}
      <SubmitButton onClick={handleSubmit} disabled={notAllow} />
    </div>
  );
}
