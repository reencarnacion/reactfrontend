import axios from "axios";
import type { LoginRequest, TokenResponse } from "../types/Auth";
import apiClient from "./ApiClient";

const BASE_PATH = "/api/auth";

export const login = async (
  credentials: LoginRequest
): Promise<TokenResponse> => {
  try {
    const response = await axios.post<TokenResponse>(
      `${BASE_PATH}/login`,
      credentials
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
  const response = await apiClient.post<TokenResponse>("/auth/refresh");

  localStorage.setItem("accessToken", response.data.accessToken);
};
