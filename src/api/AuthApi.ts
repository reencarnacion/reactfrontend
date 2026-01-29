import axios from "axios";
import type { LoginRequest, TokenResponse } from "../types/Auth";

const BASE_PATH = "/api/auth";

export const login = async (
  credentials: LoginRequest,
): Promise<TokenResponse> => {
  try {
    const response = await axios.post<TokenResponse>(
      `${import.meta.env.VITE_API_BASE_URL}${BASE_PATH}/login`,
      credentials,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "로그인에 실패했습니다.");
    }
    throw new Error("서버와 통신할 수 없습니다.");
  }
};

export const refreshAccessToken = async () => {
  const response = await axios.post<TokenResponse>(
    `${import.meta.env.VITE_API_BASE_URL}${BASE_PATH}/refresh`,
    {},
    { withCredentials: true },
  );

  localStorage.setItem("accessToken", response.data.accessToken);
};
