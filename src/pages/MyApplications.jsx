// src/pages/MyApplications.jsx
import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import "../styles/MyApplications.css";
import { toast } from "react-toastify";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get("/api/applications/my");
        setApplications(res.data);
      } catch (err) {
        toast.error("내 신청 내역을 불러오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  if (loading) return <p>불러오는 중...</p>;
  if (applications.length === 0) return <p>신청한 내역이 없습니다.</p>;

  return (
    <div className="my-applications-container">
      <h2>내 신청 내역</h2>
      <ul className="applications-list">
        {applications.map((app) => (
          <li key={app.id} className="application-item">
            <strong>{app.postTitle}</strong>
            <div>신청일: {new Date(app.appliedAt).toLocaleString("ko-KR")}</div>
            <div>상태: <span className={`status-${app.status.toLowerCase()}`}>{app.status}</span></div>
          </li>
        ))}
      </ul>
    </div>
  );
}