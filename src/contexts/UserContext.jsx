// import { createContext, useState, useContext, useEffect } from "react";

// const UserContext = createContext();

// export function UserProvider({ children }) {
//   const [user, setUser] = useState(null);

//   // ✅ 로그인 상태 유지용 localStorage 확인
//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("loginUser"));
//     if (saved) setUser(saved);
//   }, []);

//   const login = (userInfo) => {
//     setUser(userInfo);
//     localStorage.setItem("loginUser", JSON.stringify(userInfo));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("loginUser");
//   };

//   return (
//     <UserContext.Provider value={{ user, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// export function useUser() {
//   return useContext(UserContext);
// }



import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  // user 상태는 null이거나 { email: '...', name: '...', nickname: '...' } 형태가 될 수 있습니다.
  const [user, setUser] = useState(null);

  // 이메일에서 닉네임을 추출하는 헬퍼 함수
  const getNicknameFromEmail = (email) => {
    if (email && typeof email === 'string' && email.includes('@')) {
      return email.split('@')[0];
    }
    return ''; // 유효하지 않은 이메일인 경우 빈 문자열 반환
  };

  // ✅ 로그인 상태 유지용 localStorage 확인
  useEffect(() => {
    // localStorage에서 "loginUser" 키의 값을 가져옵니다.
    const storedUser = localStorage.getItem("loginUser");

    // storedUser가 null이거나, 문자열 "undefined"가 아닌 경우에만 JSON.parse를 시도합니다.
    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        
        // ✅ 로드된 사용자 정보에 nickname이 없거나 name이 없을 경우 이메일에서 추출하여 추가
        if (parsedUser) {
            if (!parsedUser.name && parsedUser.email) { // 이름이 없으면 이메일 앞부분을 닉네임으로 사용
                parsedUser.nickname = getNicknameFromEmail(parsedUser.email);
            } else if (parsedUser.name) { // 이름이 있으면 이름을 닉네임으로 사용
                parsedUser.nickname = parsedUser.name;
            }
        }
        setUser(parsedUser);
      } catch (error) {
        // JSON 파싱 중 에러가 발생하면 콘솔에 에러를 로깅하고, user 상태를 null로 설정합니다.
        console.error("Failed to parse 'loginUser' from localStorage:", error);
        localStorage.removeItem("loginUser"); // 잘못된 데이터는 제거하여 다음 로드 시도 시 에러 방지
        setUser(null); // 안전하게 사용자 상태 초기화
      }
    }
  }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행됨을 의미합니다.

  const login = (userInfo) => {
    // ✅ 로그인 시 전달받은 userInfo에 nickname 필드 추가
    if (userInfo) {
        if (!userInfo.name && userInfo.email) { // 이름이 없으면 이메일 앞부분을 닉네임으로 사용
            userInfo.nickname = getNicknameFromEmail(userInfo.email);
        } else if (userInfo.name) { // 이름이 있으면 이름을 닉네임으로 사용
            userInfo.nickname = userInfo.name;
        }
    }
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