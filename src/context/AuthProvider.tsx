import { useCallback, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContextDefinition";

// Provider 컴포넌트
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("accessToken")
  );
  // !! => 불리언 타입 명시적 변환

  const login = useCallback((token: string) => {
    localStorage.setItem("accessToken", token);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    // TODO: 리프레쉬토큰 구현 시 그것도 제거
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
