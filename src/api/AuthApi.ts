import axios from "axios";
import type { LoginRequest, LoginResponse } from "../types/Auth";

const BASE_PATH = "/api/auth/";

export const login = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${BASE_PATH}login`,
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
