// JWT 토큰 전송 Axios 인터셉터
import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { refreshAccessToken } from "./AuthApi";

const MAX_RETRY_COUNT = 1;

const apiClient = axios.create({
  baseURL: "/api",
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
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
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
    }
  }
);

export default apiClient;
