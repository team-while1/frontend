import "./SignUp.css";
import FormInput from "../components/FormInput";
import ErrorMessage from "../components/ErrorMessage";
import SubmitButton from "../components/SubmitButton";
import useSignUpForm from "../hooks/useSignUpForm";
import useSignUpHandler from "../hooks/useSignUpHandler";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { signUp } from "../api/auth"; // signUp 함수 추가로 가정

export default function SignUp() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [pw, setPw] = useState('');
//   const [confirmPw, setConfirmPw] = useState('');
//   const [name, setName] = useState('');
//   const [school, setSchool] = useState('');
//   const [studentId, setStudentId] = useState('');
//   const [major, setMajor] = useState('');

//   const [emailValid, setEmailValid] = useState(false);
//   const [pwValid, setPwValid] = useState(false);
//   const [pwMatch, setPwMatch] = useState(false);
//   const [notAllow, setNotAllow] = useState(true);

//   const handleEmail = (e) => {
//     const input = e.target.value;
//     setEmail(input);
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     setEmailValid(regex.test(input));
//   };

//   const handlePw = (e) => {
//     const input = e.target.value;
//     setPw(input);
//     const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
//     setPwValid(regex.test(input));
//   };

//   const handleConfirmPw = (e) => {
//     const input = e.target.value;
//     setConfirmPw(input);
//     setPwMatch(pw === input);
//   };

//   useEffect(() => {
//     const allFilled = name && school && studentId && major;
//     setPwMatch(pw === confirmPw);
//     setNotAllow(!(emailValid && pwValid && pwMatch && allFilled));
//   }, [emailValid, pwValid, pw, confirmPw, name, school, studentId, major]);

// const handleSubmit = async () => {
//   if (notAllow) return;
//   console.log('너냐?');
//   try {
//     await signUp({
//       email,
//       password: pw,
//       name,
//       student_num: studentId, // ✅ 여긴 반드시 "student_num"
//       college: school,         // ✅ 여긴 반드시 "college"
//       major                   // ✅ major는 그대로
//     });

//     alert('회원가입이 완료되었습니다.');
//     navigate('/login');
//   } catch (error) {
//     console.error('회원가입 실패:', error);
//     alert('회원가입 중 오류가 발생했습니다.');
//   }
// };


  const {
    email,
    password: pw,
    confirmPw,
    name,
    college: school,
    student_num,
    major,
    handleEmail,
    handlePw,
    handleConfirmPw,
    setName,
    setSchool,
    setStudent_num,
    setMajor,
    emailValid,
    pwValid,
    pwMatch,
    notAllow,
  } = useSignUpForm();

  const handleSubmit = useSignUpHandler({
    email,
    pw,
    name,
    school,
    student_num,
    major,
    notAllow,
  });


  return (
    <div className="page page-signup">
      <div className="titleWrap">회원가입</div>

      <div className="contentWrap">
//         <div className="inputWrap">
//           <select
//             className={`input ${school === "" ? "placeholder" : ""}`}
//             value={school}
//             onChange={(e) => setSchool(e.target.value)}
//           >
//             <option value="">단과대</option>
//             <option value="융합기술대학">융합기술대학</option>
//             <option value="공과대학">공과대학</option>
//             <option value="인문대학">인문대학</option>
//           </select>
//         </div>
        <FormInput
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormInput
          placeholder="대학교"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
        <FormInput
          placeholder="학번"
          value={student_num}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <FormInput
          placeholder="학과"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />

        <hr className="line" />

        <FormInput placeholder="이메일" value={email} onChange={handleEmail} />
        <ErrorMessage
          condition={!emailValid && email.length > 0}
          message="올바른 이메일 형식을 입력하세요."
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
