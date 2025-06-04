// 📄 src/hooks/useFindAccountForm.js
// 👉 아이디 또는 비밀번호를 찾기 위한 사용자 정의 훅

import { useState } from "react";
import axios from "../api/axiosInstance"; // ✅ 공통 axios 인스턴스 사용

export default function useFindAccountForm() {
  // ✅ 상태 정의
  const [activeTab, setActiveTab] = useState("findId"); // "findId" 또는 "findPw"
  const [studentNum, setStudentNum] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newPw, setNewPw] = useState(""); // 비밀번호 변경용
  const [foundInfo, setFoundInfo] = useState("");

  // ✅ 탭 변경 시 초기화
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setStudentNum("");
    setName("");
    setEmail("");
    setNewPw("");
    setFoundInfo("");
  };

  // ✅ API 호출 로직
  const handleSearch = async () => {
    try {
      if (activeTab === "findId") {
        // 아이디 찾기 요청
        const res = await axios.post("/find/id", {
          student_num: studentNum,
        });
        setFoundInfo(`가입된 이메일: ${res.data.email}`);
      } else if (activeTab === "findPw") {
        // 비밀번호 변경 요청
        const res = await axios.post("/find/pw-change", {
          name,
          email,
          student_num: studentNum,
          password: newPw,
        });
        setFoundInfo(res.data.message); // ex: "비밀번호 변경 성공"
      }
    } catch (err) {
      // 서버 응답에 따라 적절한 메시지 표시
      setFoundInfo(err?.response?.data?.message || "정보를 찾을 수 없습니다.");
    }
  };

  return {
    activeTab,
    studentNum,
    name,
    email,
    newPw,
    foundInfo,
    setStudentNum,
    setName,
    setEmail,
    setNewPw,
    handleTabChange,
    handleSearch,
  };
}