// src/components/ApplicationManage.jsx
import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { toast } from "react-toastify";

function ApplicationManage({ postId, onStatusChange }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`/api/applications/posts/${postId}`);
      setApplications(res.data);
    } catch (err) {
      console.error("신청자 목록 불러오기 실패:", err);
      toast.error("신청자 정보를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [postId]);

  const handleApprove = async (applicationId) => {
    try {
      await axios.patch(`/api/applications/status/${applicationId}`, {
        status: "APPROVED",
      });

      await axios.post(`/api/posts/${postId}/apply`);

      toast.success("신청을 승인했습니다.");
      onStatusChange?.();
      fetchApplications();
    } catch (err) {
      console.error("승인 실패:", err);
      toast.error("승인 처리 중 오류가 발생했습니다.");
    }
  };

  const handleReject = async (applicationId) => {
    try {
      await axios.patch(`/api/applications/status/${applicationId}`, {
        status: "REJECTED",
      });

      toast.info("신청을 거절했습니다.");
      onStatusChange?.();
      fetchApplications();
    } catch (err) {
      console.error("거절 실패:", err);
      toast.error("거절 처리 중 오류가 발생했습니다.");
    }
  };

  if (loading) return <p>신청 내역을 불러오는 중...</p>;
  if (applications.length === 0) return <p>신청자가 없습니다.</p>;

  return (
    <div className="application-manage-box">
      <h3>🧾 신청 관리</h3>
      <ul>
        {applications.map((app) => (
          <li key={app.id} className="application-item">
            <p><strong>신청자:</strong> {app.memberName}</p>
            <p className="status"><strong>상태:</strong> {app.status}</p>
            <p><strong>메시지:</strong> {app.comment}</p>
            {app.status === "PENDING" && (
              <div className="buttons">
                <button className="approve" onClick={() => handleApprove(app.id)}>
                  ✅ 승인
                </button>
                <button className="reject" onClick={() => handleReject(app.id)}>
                  ❌ 거절
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApplicationManage;