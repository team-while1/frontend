// UserContext.jsx
import { createContext, useState, useContext, useEffect, useRef } from "react";
import jwtDecode  from "jwt-decode";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const logoutTimer = useRef(null);
  const logoutCalled = useRef(false); // ✅ 중복 호출 방지

  const getNicknameFromEmail = (email) => {
    if (email && typeof email === 'string' && email.includes('@')) {
      return email.split('@')[0];
    }
    return '';
  };

  const logout = (reason = "자동 로그아웃 되었습니다.") => {
    if (logoutCalled.current) return;
    logoutCalled.current = true;

    setUser(null);
    localStorage.removeItem("loginUser");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // ✅ alert와 리다이렉트는 setTimeout으로 감싸 중복 방지
    setTimeout(() => {
      alert(reason);
      window.location.href = "/login";
    }, 100);
  };

  const scheduleLogout = (token) => {
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now();
      const expiresIn = decoded.exp * 1000 - currentTime;

      if (expiresIn <= 0) {
        logout("세션이 만료되었습니다. 다시 로그인해주세요.");
        return;
      }

      if (logoutTimer.current) clearTimeout(logoutTimer.current);
      logoutTimer.current = setTimeout(() => {
        logout("세션이 만료되었습니다. 다시 로그인해주세요.");
      }, expiresIn);
    } catch (err) {
      console.error("토큰 디코딩 실패:", err);
      logout("세션이 유효하지 않습니다. 다시 로그인해주세요.");
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("loginUser");
    const token = localStorage.getItem("accessToken");

    if (storedUser && storedUser !== "undefined" && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const decoded = jwtDecode(token);
        const currentTime = Date.now();
        const expiresIn = decoded.exp * 1000 - currentTime;

        if (expiresIn <= 0) {
          logout("세션이 만료되었습니다. 다시 로그인해주세요.");
          return;
        }

        parsedUser.nickname = parsedUser.name || getNicknameFromEmail(parsedUser.email);
        setUser(parsedUser);
        scheduleLogout(token);
      } catch (error) {
        console.error("토큰 확인 또는 유저 파싱 실패:", error);
        logout("로그인이 필요한 서비스입니다.");
      }
    } else {
      setUser(null);
    }

    return () => {
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
    };
  }, []);

  const login = (userInfo) => {
    if (userInfo) {
      userInfo.nickname = userInfo.name || getNicknameFromEmail(userInfo.email);
    }

    setUser(userInfo);
    localStorage.setItem("loginUser", JSON.stringify(userInfo));

    const token = localStorage.getItem("accessToken");
    scheduleLogout(token);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}