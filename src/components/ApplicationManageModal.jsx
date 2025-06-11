import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import "../styles/Modal.css";
import { toast } from "react-toastify";

export default function ApplicationManageModal({ postId, onClose }) {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`/api/applications/posts/${postId}`);
      setApplications(res.data);
    } catch (err) {
      console.error("❌ 신청 내역 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [postId]);

  const handleApprove = async () => {
    try {
      await axios.post(`/api/posts/${postId}/apply`);
      toast.success("신청을 수락했습니다.");
      fetchApplications();
    } catch (err) {
      console.error("❌ 승인 실패:", err);
      toast.error("승인 요청에 실패했습니다.");
    }
  };

  const handleReject = async (id) => {
    toast.info("거절");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>×</button>
        <h3>🧾 신청 관리</h3>
        <ul className="application-list">
          {applications.map((app) => (
            <li key={app.id} className="application-card">
              <p><strong>신청자:</strong> {app.memberName}</p>
              <p><strong>상태:</strong> {app.status}</p>
              <p><strong>메시지:</strong> {app.comment}</p>
              <div className="btn-group">
                <button onClick={() => handleApprove()}>✅ 승인</button>
                <button onClick={() => handleReject(app.id)}>❌ 거절</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}