import React from 'react';
import { useUser } from '../contexts/UserContext';
import './MyPage.css';
import { useNavigate } from 'react-router-dom'; // ✅ 추가


export default function MyPage() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  if (!user) {
    return <p>로그인이 필요합니다.</p>;
  }

  return (
    <div className="mypage-container">
      <p className='mypage-title'>{user.name}<span>님</span></p>
      
      <table className="info-table">
        <tbody>
          <tr>
            <th>이메일</th>
            <td>{user.email}</td>
          </tr>
          <tr>
            <th>대학교</th>
            <td>{user.school}</td>
          </tr>
          <tr>
            <th>학과</th>
            <td>{user.major}</td>
          </tr>
          <tr>
            <th>학번</th>
            <td>{user.studentId}</td>
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
        <button onClick={logout} className="nav-button">로그아웃</button>
      </div>
    </div>
  );
}