// JWT 토큰 전송 Axios 인터셉터
import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import type { ProblemDetail, StandardizeError } from "../types/ProblemDetail";
import { refreshAccessToken } from "./AuthApi";

const MAX_RETRY_COUNT = 1;

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}` || "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 등록
apiClient.interceptors.request.use(
  (config) => {
    // 성공
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  async (error: AxiosError) => {
    // 실패
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    // 성공
    return response;
  },
  async (error: AxiosError) => {
    // 실패
    const originalRequest = error.config as AxiosRequestConfig & {
      _retryCount?: number;
    };

    const refreshToken = localStorage.getItem("refreshToken");

    if (
      error.response?.status === 401 &&
      originalRequest &&
      (originalRequest._retryCount || 0) < MAX_RETRY_COUNT &&
      refreshToken
    ) {
      // 401 - 토큰 리프레쉬
      originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

      try {
        await refreshAccessToken();

        originalRequest.headers ||= {}; // 정의되지 않은 경우 빈 객체로 초기화
        originalRequest.headers.Authorization = `Bearer ${localStorage.getItem(
          "accessToken"
        )}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        return Promise.reject(refreshError);
      }
    } else if (error.response) {
      const problemDetail: ProblemDetail = error.response.data as ProblemDetail;
      const status = error.response.status;

      if (!problemDetail.status || !problemDetail.detail) {
        return Promise.reject(new Error("예상치 못한 오류 응답 구조입니다."));
      }

      const standardizedError: StandardizeError = new Error(
        problemDetail.detail || `API 요청 실패 (Status: ${status})`
      ) as StandardizeError;

      standardizedError.status = status;
      standardizedError.errors = problemDetail.errors;
      standardizedError.title = problemDetail.title;

      return Promise.reject(standardizedError);
    } else {
      const networkError: Error = new Error(
        "네트워크 연결 또는 요청에 실패했습니다."
      );
      return Promise.reject(networkError);
    }
  }
);

export default apiClient;
