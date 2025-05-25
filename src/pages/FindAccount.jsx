import React, { useState } from "react";
import './FindAccount.css';

export default function FindAccount() {
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

  return (
    <div className="page-findAccount">
<div className="tabWrap">
  <button
    className={`tab-button ${activeTab === "findId" ? "active" : ""}`}
    onClick={() => handleTabChange("findId")}
  >
    아이디 찾기
  </button>
  <button
    className={`tab-button ${activeTab === "findPw" ? "active" : ""}`}
    onClick={() => handleTabChange("findPw")}
  >
    비밀번호 찾기
  </button>
</div>

      <div className="contentWrap">
        <div className="inputTitle"></div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {activeTab === "findPw" && (
          <>
            <div className="inputTitle" style={{ marginTop: "26px" }}></div>
            <div className="inputWrap">
              <input
                className="input"
                type="text"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </>
        )}
      </div>

      <button className="bottomButton" onClick={handleSearch}>
        {activeTab === "findId" ? "확인" : "확인"}
      </button>

      {foundInfo && (
        <div className="resultMessageWrap">{foundInfo}</div>
      )}
    </div>
  );
}

