// src/pages/FindAccount.jsx
import React from "react";
import "../styles/FindAccount.css";
import useFindAccountForm from "../hooks/useFindAccountForm";
import TabSelector from "../components/TabSelector";
import ResultMessage from "../components/ResultMessage";
import FormInput from "../components/FormInput";

export default function FindAccount() {
  const {
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
    handleSearch
  } = useFindAccountForm();

  return (
    <div className="page-findAccount">
      <TabSelector activeTab={activeTab} onChange={handleTabChange} />

      <div className="contentWrap">
        <FormInput
          placeholder="학번"
          value={studentNum}
          onChange={(e) => setStudentNum(e.target.value)}
          autoFocus
        />

        {activeTab === "findPw" && (
          <>
            <FormInput
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormInput
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormInput
              placeholder="새 비밀번호"
              type="password"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
            />
          </>
        )}
      </div>

      <button className="bottomButton" onClick={handleSearch}>
        확인
      </button>

      {foundInfo && <ResultMessage message={foundInfo} />}
    </div>
  );
}