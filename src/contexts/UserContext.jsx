import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  let logoutTimer = null;

  // 이메일에서 닉네임을 추출하는 헬퍼 함수
  const getNicknameFromEmail = (email) => {
    if (email && typeof email === 'string' && email.includes('@')) {
      return email.split('@')[0];
    }
    return '';
  };

  // 🔐 로그아웃 함수
  const logout = () => {
    setUser(null);
    localStorage.removeItem("loginUser");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    alert("자동 로그아웃 되었습니다.");
    window.location.href = "/login"; // 강제 리디렉션
  };

  // ✅ 페이지 닫을 때 로그아웃
  useEffect(() => {
    const handleUnload = () => {
      logout();
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  // ✅ 로그인 상태 복원 + 자동 로그아웃 타이머 설정
  useEffect(() => {
    const storedUser = localStorage.getItem("loginUser");

    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);

        if (parsedUser) {
          if (!parsedUser.name && parsedUser.email) {
            parsedUser.nickname = getNicknameFromEmail(parsedUser.email);
          } else if (parsedUser.name) {
            parsedUser.nickname = parsedUser.name;
          }
        }

        setUser(parsedUser);

        // ⏰ 자동 로그아웃 타이머 설정 (30분 후 로그아웃)
        logoutTimer = setTimeout(() => {
          logout();
        }, 30 * 60 * 1000); // 30분

      } catch (error) {
        console.error("Failed to parse 'loginUser' from localStorage:", error);
        localStorage.removeItem("loginUser");
        setUser(null);
      }
    }

    return () => {
      if (logoutTimer) clearTimeout(logoutTimer);
    };
  }, []);

  const login = (userInfo) => {
    if (userInfo) {
      if (!userInfo.name && userInfo.email) {
        userInfo.nickname = getNicknameFromEmail(userInfo.email);
      } else if (userInfo.name) {
        userInfo.nickname = userInfo.name;
      }
    }

    setUser(userInfo);
    localStorage.setItem("loginUser", JSON.stringify(userInfo));

    // ⏰ 로그인 시에도 자동 로그아웃 타이머 다시 설정
    if (logoutTimer) clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
      logout();
    }, 30 * 60 * 1000);
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