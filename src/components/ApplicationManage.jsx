import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { toast } from "react-toastify";

function ApplicationManage({ postId, onStatusChange }) {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`/api/posts/${postId}/applications`);
        setApplications(res.data);
      } catch (err) {
        console.error("❌ 신청 목록 불러오기 실패:", err);
      }
    };

    fetchApplications();
  }, [postId]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      // 1. 신청 상태 변경
      await axios.patch(`/api/applications/status/${id}`, { status: newStatus });

      // 2. 상태 업데이트 (프론트)
      setApplications(prev =>
        prev.map(app => (app.id === id ? { ...app, status: newStatus } : app))
      );

      // 3. 승인이라면 appliedCount 증가 요청
      if (newStatus === "APPROVED") {
        await axios.post(`/api/posts/${postId}/apply`);
        toast.success("신청 승인 및 인원 추가 완료 ✅");
      } else {
        toast.info("신청이 거절되었습니다.");
      }

      // 4. 상위 컴포넌트(PostDetail)에서 게시글 정보 새로고침
      if (onStatusChange) {
        onStatusChange();
      }
    } catch (err) {
      console.error("❌ 상태 변경 실패:", err);
      toast.error("상태 변경에 실패했습니다.");
    }
  };

  return (
    <div className="application-manage">
      <h4>신청 관리</h4>
      <ul>
        {applications.map(app => (
          <li key={app.id}>
            <span>{app.memberName}</span> - <strong>{app.status}</strong>
            {app.status === "PENDING" && (
              <div>
                <button onClick={() => handleStatusChange(app.id, "APPROVED")}>승인</button>
                <button onClick={() => handleStatusChange(app.id, "REJECTED")}>거절</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApplicationManage;