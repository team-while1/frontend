import "./SignUp.css";
import FormInput from "../components/FormInput";
import ErrorMessage from "../components/ErrorMessage";
import SubmitButton from "../components/SubmitButton";
import useSignUpForm from "../hooks/useSignUpForm";
import useSignUpHandler from "../hooks/useSignUpHandler";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { signUp } from "../api/auth";

  export default function SignUp() {
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
  });

  return ( 
    <div className="page page-signup">
      <div className="titleWrap">회원가입</div>
      <div className="contentWrap">
        <FormInput
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="inputWrap">
          <select
            className={`input ${college === "" ? "placeholder" : ""}`}
            value={college}
            onChange={(e) => setCollege(e.target.value)}
          >
            {/* 🚨 개선: 'value=""'는 기본 옵션이므로, 사용자가 선택하지 않으면 빈 문자열이 전송될 수 있음을 명확히 함 */}
            <option value="" disabled hidden>단과대 선택</option> 
            <option value="융합기술대학">융합기술대학</option>
            <option value="공과대학">공과대학</option>
            <option value="인문대학">인문대학</option>
          </select>
          {/* 🚨 추가: 사용자가 단과대를 선택하지 않았을 때의 에러 메시지 (선택 사항) */}
          {college === "" && !notAllow && <ErrorMessage message="단과대를 선택해주세요." />}
{/* =======
        <div className="inputWrap">
          <input
            type="text"
            className="input"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
>>>>>>> main */}
        </div>
        <FormInput
          placeholder="학번"
          value={student_num}
          onChange={(e) => setStudent_num(e.target.value)}
        />
        <FormInput
          placeholder="학과"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />

        <hr className="line" />

        <FormInput placeholder="이메일" value={email} onChange={handleEmail} />

        <ErrorMessage
          condition={!emailValid && typeof email === "string" && email.length > 0}
          message="올바른 이메일 형식을 입력하세요."
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
        <FormInput
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPw}
          onChange={handleConfirmPw}
        />
        <ErrorMessage
          condition={!pwMatch && confirmPw.length > 0}
          message="비밀번호가 일치하지 않습니다."
        />
{/* =======
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
>>>>>>> main */}
      </div>

      <SubmitButton onClick={handleSubmit} disabled={notAllow} />
    </div>
  );
}