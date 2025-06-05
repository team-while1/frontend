import "../styles/SignUp.css";
import FormInput from "../components/FormInput";
import ErrorMessage from "../components/ErrorMessage";
import SubmitButton from "../components/SubmitButton";
import useSignUpForm from "../hooks/useSignUpForm";
import useSignUpHandler from "../hooks/useSignUpHandler";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function SignUp() {
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
    navigate,
  });

  const majorOptions = {
    "융합기술대학": ["기계공학과", "자동차공학과", "항공·기계설계학과", "전기공학과", "전자공학과", "컴퓨터공학과", "컴퓨터소프트웨어공학과", "AI로봇공학과", "바이오메디컬융합학과", "정밀의료·의료기기학과"],
    "공과대학": ["사회기반공학전공", "환경공학전공", "도시·교통공학전공", "화공생물공학과", "반도체신소재공학과", "나노화학소재공학과", "산업경영공학과", "안전공학과", "건축공학과", "건축학과", "산업디자인학과", "커뮤니케이션디자인학과"],
    "인문대학": ["영어영문학과", "중국어학과", "한국어문학과", "음악학과", "스포츠의학과", "스포츠산업학과"],
    "사회과학대학": ["행정학과", "행정정보융합학과", "경영학과", "융합경영학과", "국제무역학과", "사회복지학과", "항공서비스학과", "항공운항학과", "유아교육학과", "미디어&콘텐츠학과"],
    "보건생명대학": ["간호학과", "물리치료학과", "응급구조학과", "식품공학전공", "식품영양학전공", "생명공학전공", "유아특수교육학과", "IT응용융합학과", "화장품산업학과", "천연물소재학과"],
    "철도대학": ["철도경영·물류학과", "데이터사이언스전공", "인공지능전공", "철도운전시스템공학과", "철도차량시스템공학과", "철도인프라공학과", "철도전기정보공학과"],
    "미래융합대학": ["안전융합공학과", "건설방재융합공학과", "스포츠복지학과", "복지·경영학과", "스마트철도교통공학과", "이차전지공학과"],
    "교양학부/자유전공학부/창의융합학부": ["교양학부", "자유전공학부", "창의융합학부"],
  };

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
            onChange={(e) => {
              setCollege(e.target.value);
              setMajor(""); // 단과대 바뀌면 학과 초기화
            }}
          >
            <option value="" disabled hidden>단과대 선택</option>
            {Object.keys(majorOptions).map((collegeName) => (
              <option key={collegeName} value={collegeName}>{collegeName}</option>
            ))}
          </select>
          {college === "" && !notAllow && <ErrorMessage message="단과대를 선택해주세요." />}
        </div>

        {/* 학과 선택 */}
        <div className="inputWrap">
          <select
            className={`input ${major === "" ? "placeholder" : ""}`}
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            disabled={!college}
          >
            <option value="" disabled hidden>학과 선택</option>
            {college && majorOptions[college]?.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <FormInput
          placeholder="학번"
          value={student_num}
          onChange={(e) => setStudent_num(e.target.value)}
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
      </div>

      <SubmitButton onClick={handleSubmit} disabled={notAllow} />
    </div>
  );
}