import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

function ApplicationManage({ postId }) {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`/api/posts/${postId}/applications`);
        setApplications(res.data); // 신청 리스트
      } catch (err) {
        console.error("신청 목록 불러오기 실패:", err);
      }
    };

    fetchApplications();
  }, [postId]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`/api/applications/status/${id}`, { status: newStatus });
      setApplications(prev =>
        prev.map(app => (app.id === id ? { ...app, status: newStatus } : app))
      );
      alert(`신청이 ${newStatus === "APPROVED" ? "승인" : "거절"}되었습니다.`);
    } catch (err) {
      console.error("상태 변경 실패:", err);
    }
  };

  return (
    <div>
      <h4>신청 관리</h4>
      <ul>
        {applications.map(app => (
          <li key={app.id}>
            {app.memberName} - 상태: {app.status}
            {app.status === "PENDING" && (
              <>
                <button onClick={() => handleStatusChange(app.id, "APPROVED")}>승인</button>
                <button onClick={() => handleStatusChange(app.id, "REJECTED")}>거절</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApplicationManage;