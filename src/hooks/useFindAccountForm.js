import { useState } from "react";

export default function useFindAccountForm() {
  const [activeTab, setActiveTab] = useState("findId");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [foundInfo, setFoundInfo] = useState("");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setEmail("");
    setName("");
    setFoundInfo("");
  };

  const handleSearch = () => {
    const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (!storedUser) {
      setFoundInfo("등록된 사용자 정보가 없습니다.");
      return;
    }

    if (activeTab === "findId") {
      if (storedUser.name === name) {
        setFoundInfo(`가입된 이메일은: ${storedUser.email}`);
      } else {
        setFoundInfo("일치하는 사용자를 찾을 수 없습니다.");
      }
    } else {
      if (storedUser.email === email && storedUser.name === name) {
        setFoundInfo(`비밀번호는: ${storedUser.password}`);
      } else {
        setFoundInfo("입력하신 정보가 일치하지 않습니다.");
      }
    }
  };

  return {
    activeTab,
    email,
    name,
    foundInfo,
    setEmail,
    setName,
    handleTabChange,
    handleSearch,
  };
}