import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // ✅ 로그인 상태 유지용 localStorage 확인
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("loginUser"));
    if (saved) setUser(saved);
  }, []);

  const login = (userInfo) => {
    setUser(userInfo);
    localStorage.setItem("loginUser", JSON.stringify(userInfo));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loginUser");
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