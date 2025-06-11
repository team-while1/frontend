import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { useUser } from "../contexts/UserContext";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchMyApplications = async () => {
      try {
        const res = await axios.get(`/api/member/${user.id}/applications`);
        setApplications(res.data);
      } catch (err) {
        console.error("신청 내역 불러오기 실패:", err);
      }
    };

    if (user?.id) fetchMyApplications();
  }, [user]);

  return (
    <div>
      <h3>내가 신청한 글 목록</h3>
      <ul>
        {applications.map((app) => (
          <li key={app.id}>
            <strong>{app.postTitle}</strong> - 상태: {app.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyApplications;