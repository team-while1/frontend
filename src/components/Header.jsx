import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import './Header.css';

export default function Header() {
  const { user, logout } = useUser(); // ✅ 반드시 함수 내부에서 호출해야 함
  const navigate = useNavigate();

  console.log("🧾 현재 로그인된 유저:", user);

  return (
    <header className="header">
      <h1 className="logo">
        <Link to="/" className="logo-link">
        <img src="/kk.png" alt="KUNNECT Logo" width="60"/>       
        </Link>
      </h1>

      <nav className="nav">
        {user ? (
          <>
            <button className='nav-button' onClick={()=>navigate("/mypage")}>{user.nickname || '회원'}님</button>
            <button onClick={logout} className="nav-button">로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">로그인</Link>
            <Link to="/signup" className="nav-link">회원가입</Link>
          </>
        )}
      </nav>
    </header>
  );
}