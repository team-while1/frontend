import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import './Header.css';

export default function Header() {
  const { user, logout } = useUser(); // ✅ 반드시 함수 내부에서 호출해야 함

  return (
    <header className="header">
      <h1 className="logo">
        <Link to="/" className="logo-link">
          KNUNECT
        </Link>
      </h1>

      <nav className="nav">
        {user ? (
          <>
            <span className="welcome">{user.name}님</span>
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