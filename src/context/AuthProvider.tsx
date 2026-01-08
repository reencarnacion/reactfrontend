import { useCallback, useState, type ReactNode } from "react";
import type { TokenResponse } from "../types/Auth";
import { AuthContext } from "./AuthContextDefinition";

// Provider 컴포넌트: app.tsx에서 메인레이아웃 상위에 위치
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("accessToken")
  );
  // !! => 불리언 타입 명시적 변환

  const login = useCallback((authData: TokenResponse) => {
    localStorage.setItem("accessToken", authData.accessToken);

    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");

    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
