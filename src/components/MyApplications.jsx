import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { toast } from "react-toastify";

function MyApplications({ isViewingApplications, onClose }) {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchMyApplications = async () => {
      try {
        const res = await axios.get("/api/applications/my");
        setApplications(res.data);
      } catch (err) {
        console.error("❌ 내 신청 내역 불러오기 실패:", err);
        toast.error("신청 내역을 불러오지 못했습니다.");
      }
    };

    if (isViewingApplications) {
      fetchMyApplications();
    }
  }, [isViewingApplications]);

  if (!isViewingApplications) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
        style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)", // ⭐ 중앙 정렬 핵심
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "100vh",
        }}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#fff",
          padding: "24px",
          borderRadius: "12px",
          width: "400px",
          maxHeight: "80vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          className="modal-close-button"
          style={{
            position: "absolute",
            top: "12px",
            right: "16px",
            fontSize: "20px",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          ✕
        </button>
        <h4 style={{ fontSize: "18px", marginBottom: "10px" }}>📋 내가 신청한 글</h4>
        <div
          className="mypage-applications-list"
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          {applications.length === 0 ? (
            <p style={{ color: "#888" }}>신청한 내역이 없습니다.</p>
          ) : (
            applications.map((app) => (
              <div
                key={app.id}
                className="mypage-app-card"
                style={{
                  padding: "12px 16px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  backgroundColor: "#f8fafc",
                }}
              >
                <div
                  className="app-title"
                  style={{ fontWeight: "bold", marginBottom: "4px" }}
                >
                  {app.postTitle}
                </div>
                <div
                  className={`app-status ${app.status.toLowerCase()}`}
                  style={{
                    color:
                      app.status === "APPROVED"
                        ? "#0f766e"
                        : app.status === "REJECTED"
                        ? "#b91c1c"
                        : "#475569",
                    fontSize: "14px",
                  }}
                >
                  상태: {app.status}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MyApplications;