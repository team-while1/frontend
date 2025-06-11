import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { toast } from "react-toastify";


function MyApplicationsManage() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchMyPostApplications = async () => {
      try {
        const res = await axios.get("/api/applications/my-posts");
        setApplications(res.data);
      } catch (err) {
        console.error("❌ 신청 목록 불러오기 실패:", err);
        toast.error("신청 정보를 불러오지 못했습니다.");
      }
    };

    fetchMyPostApplications();
  }, []);

  const handleStatusChange = async (appId, postId, newStatus) => {
    try {
      await axios.patch(`/api/applications/status/${appId}`, {
        status: newStatus,
      });

      if (newStatus === "APPROVED") {
        await axios.post(`/api/posts/${postId}/apply`);
        toast.success("신청 승인 완료 + 인원 추가");
      } else {
        toast.info("신청이 거절되었습니다.");
      }

      // 상태 최신화
      setApplications(prev =>
        prev.map(app =>
          app.id === appId ? { ...app, status: newStatus } : app
        )
      );
    } catch (err) {
      console.error("❌ 상태 변경 실패:", err);
      toast.error("상태 변경에 실패했습니다.");
    }
  };

  return (
    <div className="my-applications-manage">
      <h3>📩 내 게시글 신청 관리</h3>
      {applications.length === 0 ? (
        <p>들어온 신청이 없습니다.</p>
      ) : (
        <ul>
          {applications.map(app => (
            <li key={app.id}>
              <div>
                <strong>{app.memberName}</strong> 님이
                <strong> [{app.postTitle}]</strong>에 신청했습니다.
              </div>
              <div>현재 상태: {app.status}</div>
              {app.status === "PENDING" && (
                <div>
                  <button onClick={() => handleStatusChange(app.id, app.postId, "APPROVED")}>승인</button>
                  <button onClick={() => handleStatusChange(app.id, app.postId, "REJECTED")}>거절</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyApplicationsManage;