import { createContext, useState, useContext, useEffect, useRef } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const logoutTimer = useRef(null); // 🟢 변경된 부분

  const getNicknameFromEmail = (email) => {
    if (email && typeof email === 'string' && email.includes('@')) {
      return email.split('@')[0];
    }
    return '';
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loginUser");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    alert("자동 로그아웃 되었습니다.");
    window.location.href = "/login";
  };

  useEffect(() => {
    const handleUnload = () => {
      logout();
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("loginUser");

    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);

        if (parsedUser) {
          parsedUser.nickname = parsedUser.name || getNicknameFromEmail(parsedUser.email);
        }

        setUser(parsedUser);

        // 🟢 기존 타이머 제거 후 2시간 타이머 설정
        if (logoutTimer.current) clearTimeout(logoutTimer.current);
        logoutTimer.current = setTimeout(() => {
          logout();
        }, 2 * 60 * 60 * 1000); // 2시간
<wbr></wbr>
      } catch (error) {
        console.error("Failed to parse 'loginUser':", error);
        localStorage.removeItem("loginUser");
        setUser(null);
      }
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

    if (logoutTimer.current) clearTimeout(logoutTimer.current);
    logoutTimer.current = setTimeout(() => {
      logout();
    }, 2 * 60 * 60 * 1000); // 2시간
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