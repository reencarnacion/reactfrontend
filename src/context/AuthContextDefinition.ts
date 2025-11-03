import { createContext } from "react";

// Context 타입 정의
export interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// Context 객체 생성
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
