import { useNavigate } from "react-router-dom";
import {signUp} from "../api/auth";

export default function useSignUpHandler({ email, pw, name, school, student_num, major, notAllow }) {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (notAllow) return;

    try{
      await signUp({
        email,
        password: pw,
        name,
        student_num: studentId,
        college: school,
        major
      });

//     localStorage.setItem('registeredUser', JSON.stringify({
//       email,
//       password: pw,
//       name,
//       school,
//       student_num,
//       major,
//     }));

      alert('회원가입이 완료되었습니다.');
      navigate('/login');
    } catch(err){
      console.error(err);
      alert('회원가입에 실패했습니다. 입력값을 확인해주세요');
    }
  };

  return handleSubmit;
}
//     localStorage.setItem('registeredUser', JSON.stringify({
//       email,
//       password: pw,
//       name,
//       school,
//       studentId,
//       major,
//     }));

//     alert('회원가입이 완료되었습니다.');
//     navigate('/login');
//   };

//   return handleSubmit;
// }