import './SignUp.css';
import FormInput from "../components/FormInput";
import ErrorMessage from "../components/ErrorMessage";
import SubmitButton from "../components/SubmitButton";
import useSignUpForm from "../hooks/useSignUpForm";
import useSignUpHandler from "../hooks/useSignUpHandler";

export default function SignUp() {
  const {
    email, pw, confirmPw,
    name, school, studentId, major,
    handleEmail, handlePw, handleConfirmPw,
    setName, setSchool, setStudentId, setMajor,
    emailValid, pwValid, pwMatch,
    notAllow
  } = useSignUpForm();

  const handleSubmit = useSignUpHandler({
    email, pw, name, school, studentId, major, notAllow
  });

  return (
    <div className="page page-signup">
      <div className="titleWrap">회원가입</div>

      <div className="contentWrap">
        <FormInput placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
        <FormInput placeholder="대학교" value={school} onChange={(e) => setSchool(e.target.value)} />
        <FormInput placeholder="학번" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
        <FormInput placeholder="학과" value={major} onChange={(e) => setMajor(e.target.value)} />

        <hr className="line" />

        <FormInput placeholder="이메일" value={email} onChange={handleEmail} />
        <ErrorMessage condition={!emailValid && email.length > 0} message="올바른 이메일 형식을 입력하세요." />

        <FormInput type="password" placeholder="비밀번호 (영문, 숫자, 특수문자 포함 8자 이상)" value={pw} onChange={handlePw} />
        <ErrorMessage condition={!pwValid && pw.length > 0} message="비밀번호 조건을 확인해주세요." />

        <FormInput type="password" placeholder="비밀번호 확인" value={confirmPw} onChange={handleConfirmPw} />
        <ErrorMessage condition={!pwMatch && confirmPw.length > 0} message="비밀번호가 일치하지 않습니다." />
      </div>

      <SubmitButton onClick={handleSubmit} disabled={notAllow} />
    </div>
  );
}