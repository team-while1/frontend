import { useState, useEffect } from "react";

export default function useSignUpForm() {
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

  return {
    email, pw, confirmPw,
    name, school, studentId, major,
    handleEmail, handlePw, handleConfirmPw,
    setName, setSchool, setStudentId, setMajor,
    emailValid, pwValid, pwMatch,
    notAllow
  };
}