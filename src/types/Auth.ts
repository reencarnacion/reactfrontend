export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  userId: number;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: {
    email: string;
    role: "USER" | "ADMIN" | "GUEST";
  } | null;
  isLoading: boolean;
}
