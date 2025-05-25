import { useState, useEffect } from "react";

export default function useLoginForm() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
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

  useEffect(() => {
    setNotAllow(!(emailValid && pwValid));
  }, [emailValid, pwValid]);

  return {
    email,
    pw,
    handleEmail,
    handlePw,
    emailValid,
    pwValid,
    notAllow,
  };
}