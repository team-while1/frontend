import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMember } from '../api/auth';
import '../styles/MyPage.css';
import axios from '../api/axiosInstance'; 

export default function MyPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      console.log("MyPage 진입됨"); // 진입 여부 확인
      try {
        console.log('MyPage: /member API 호출 시도...'); // 이 로그가 찍히는지 확인
        const res = await axios.get('/member');
        console.log('MyPage: /member API 응답 성공:', res); // 이 로그가 찍히면 성공
        setUser(res.data);
      } catch (err) {
        console.error('회원 정보 불러오기 실패:', err);
        alert('로그인이 필요합니다.');
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
          <tr>
            <th>전화번호</th>
            <td>{user.phone || '입력 안됨'}</td>
          </tr>
          <tr>
            <th>가입일</th>
            <td>{user.joinDate || '입력 안됨'}</td>
          </tr>
        </tbody>
      </table>

      <div className="mypage-buttons">
        <button onClick={() => navigate("/edit")}>정보 수정</button>
        <button onClick={() => navigate("/find")}>비밀번호 변경</button>
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