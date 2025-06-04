import { useState, useEffect } from "react";

export default function useSignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [student_num, setStudent_num] = useState('');
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
    setPassword(input);
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    setPwValid(regex.test(input));
  };

  const handleConfirmPw = (e) => {
    const input = e.target.value;
    setConfirmPw(input);
    setPwMatch(password === input);
  };


  useEffect(() => {
    const allFilled = name && college && student_num && major;
    setPwMatch(password === confirmPw);
    setNotAllow(!(emailValid && pwValid && pwMatch && allFilled));
  }, [emailValid, pwValid, password, confirmPw, name, college, student_num, major]);

  return {
    email, password, confirmPw,
    name, college, student_num, major,
    handleEmail, handlePw, handleConfirmPw,
    setName, setCollege, setStudent_num, setMajor,
    emailValid, pwValid, pwMatch,
    notAllow
  };
}