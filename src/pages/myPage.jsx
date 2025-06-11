// src/pages/MyPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMember } from "../api/auth";
import "../styles/MyPage.css";
import { toast } from "react-toastify";
import MyApplications from "../components/MyApplications"; // 🔹 내가 신청한 내역 컴포넌트

export default function MyPage() {
  const [user, setUser] = useState(null);
  const [showApplicationsModal, setShowApplicationsModal] = useState(false); // ✅ 모달 열기 여부
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMember();
        setUser(res.data);
      } catch (err) {
        toast.error("로그인이 필요합니다.");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  if (!user) return <p>회원 정보를 불러오는 중...</p>;

  return (
    <div className="mypage-container">
      <p className="mypage-title">{user.name}<span>님</span></p>

      <table className="info-table">
        <tbody>
          <tr><th>이메일</th><td>{user.email}</td></tr>
          <tr><th>대학교</th><td>{user.college}</td></tr>
          <tr><th>학과</th><td>{user.major}</td></tr>
          <tr><th>학번</th><td>{user.student_num}</td></tr>
        </tbody>
      </table>

      <div className="mypage-buttons">
        <button onClick={() => navigate("/edit")}>정보 수정</button>
        <button onClick={() => navigate("/find")}>비밀번호 변경</button>
        <button
          onClick={() => setShowApplicationsModal(true)}
          className="mypage-show-button"
        >
          내 신청 내역 보기
        </button>
        <button onClick={handleLogout} className="nav-button">로그아웃</button>
      </div>

      {/* ✅ 모달로 신청 내역 띄우기 */}
      {showApplicationsModal && (
        <MyApplications
          isViewingApplications={true}
          onClose={() => setShowApplicationsModal(false)}
        />
      )}
    </div>
  );
}