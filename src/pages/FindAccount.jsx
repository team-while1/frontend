import React from "react";
import "./FindAccount.css";
import useFindAccountForm from "../hooks/useFindAccountForm";
import TabSelector from "../components/TabSelector";
import ResultMessage from "../components/ResultMessage";
import FormInput from "../components/FormInput";

export default function FindAccount() {
  const {
    activeTab,
    email,
    name,
    foundInfo,
    setEmail,
    setName,
    handleTabChange,
    handleSearch
  } = useFindAccountForm();

  return (
    <div className="page-findAccount">
      <TabSelector activeTab={activeTab} onChange={handleTabChange} />

      <div className="contentWrap">
        <FormInput
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />

        {activeTab === "findPw" && (
          <FormInput
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
      </div>

      <button className="bottomButton" onClick={handleSearch}>
        확인
      </button>

      {foundInfo && <ResultMessage message={foundInfo} />}
    </div>
  );
}