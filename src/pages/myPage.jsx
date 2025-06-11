import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMember } from '../api/auth';
import '../styles/MyPage.css';
import axios from '../api/axiosInstance'; 
import { toast } from 'react-toastify';

export default function MyPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      console.log("MyPage 진입됨");
      try {
        console.log('MyPage: /member API 호출 시도...');
        const res = await getMember();
        console.log('MyPage: /member API 응답 성공:', res);
        setUser(res.data);
      } catch (err) {
        console.error('회원 정보 불러오기 실패:', err);
        toast.error('로그인이 필요합니다.');
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) return <p>회원 정보를 불러오는 중...</p>;

  return (
    <div className="mypage-container">
      <p className="mypage-title">{user.name}<span>님</span></p>

      <table className="info-table">
        <tbody>
          <tr>
            <th>이메일</th>
            <td>{user.email}</td>
          </tr>
          <tr>
            <th>대학교</th>
            <td>{user.college}</td> 
          </tr>
          <tr>
            <th>학과</th>
            <td>{user.major}</td>
          </tr>
          <tr>
            <th>학번</th>
            <td>{user.student_num}</td>
          </tr>
        </tbody>
      </table>

      <div className="mypage-buttons">
        <button onClick={() => navigate("/edit")}>정보 수정</button>
        <button onClick={() => navigate("/find")}>비밀번호 변경</button>
        <button onClick={() => navigate("/my-applications")}>내 신청 내역</button> {/* 🔹 추가된 부분 */}
        <button
          onClick={() => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            navigate('/login');
          }}
          className="nav-button"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}