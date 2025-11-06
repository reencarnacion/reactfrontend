import { createContext } from "react";
import type { TokenResponse } from "../types/Auth";

// Context 타입 정의
export interface AuthContextType {
  isAuthenticated: boolean;
  login: (authData: TokenResponse) => void;
  logout: () => void;
}

// Context 객체 생성
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
