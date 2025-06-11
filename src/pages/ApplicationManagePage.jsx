import React, { useState } from "react";
import MyApplications from "./MyApplications";
import MyPostApplications from "../components/MyPostApplications"; // 경로 주의

function ApplicationManagePage() {
  const [activeTab, setActiveTab] = useState("my"); // "my" 또는 "post"

  return (
    <div style={{ padding: "32px" }}>
      <h2 style={{ marginBottom: "16px" }}>신청 관리</h2>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={() => setActiveTab("my")}
          style={{
            backgroundColor: activeTab === "my" ? "#2563eb" : "#e5e7eb",
            color: activeTab === "my" ? "#fff" : "#000",
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          내가 신청한 글
        </button>
        <button
          onClick={() => setActiveTab("post")}
          style={{
            backgroundColor: activeTab === "post" ? "#2563eb" : "#e5e7eb",
            color: activeTab === "post" ? "#fff" : "#000",
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          내 글에 들어온 신청
        </button>
      </div>

      <div style={{ marginTop: "32px" }}>
        {activeTab === "my" ? <MyApplications /> : <MyPostApplications />}
      </div>
    </div>
  );
}

export default ApplicationManagePage;