import "./SignUp.css";
import FormInput from "../components/FormInput";
import ErrorMessage from "../components/ErrorMessage";
import SubmitButton from "../components/SubmitButton";
import useSignUpForm from "../hooks/useSignUpForm";
import useSignUpHandler from "../hooks/useSignUpHandler";

export default function SignUp() {

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

//   const handleSubmit = () => {
//     if (notAllow) return;

//     localStorage.setItem('registeredUser', JSON.stringify({
//       email,
//       password: pw,
//       name,
//       school,
//       studentId,
//       major,
//       phone: '', // 직접 받는 입력 필드 추가 필요
//       joinDate: new Date().toISOString().slice(0, 10), 
//     }));

//     alert('회원가입이 완료되었습니다.');
//     navigate('/login');
//   };


  return (
    <div className="page page-signup">
      <div className="titleWrap">회원가입</div>

      <div className="contentWrap">
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
