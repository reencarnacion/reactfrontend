import type {
  SeriesCreateRequest,
  SeriesCreateResponse,
  SeriesDetailResponse,
  SeriesResponse,
} from "../types/Series";
import apiClient from "./ApiClient";

// 생성
export const createSeries = async (
  seriesData: SeriesCreateRequest
): Promise<SeriesCreateResponse> => {
  try {
    const response = await apiClient.post("/series", seriesData);

    return response.data;
  } catch (error) {
    console.error("시리즈 생성 실패: ", error);
    throw new Error("시리즈 생성에 실패했습니다.");
  }
};

// 삭제
export const deleteSeries = async (seriesId: number): Promise<void> => {
  try {
    await apiClient.delete(`/series/${seriesId}`);
  } catch (error) {
    console.error("시리즈 삭제 실패: ", error);
    throw new Error("시리즈 삭제에 실패했습니다.");
  }
};

// 목록조회
export const fetchAllSeries = async (): Promise<SeriesResponse[]> => {
  try {
    const response = await apiClient.get<SeriesResponse[]>("/series", {});

    return response.data;
  } catch (error) {
    console.error("시리즈 목록조회 실패: ", error);
    throw new Error("시리즈 목록조회에 실패했습니다.");
  }
};

// 상세  + 관련게시글 목록조회
export const fetchSeriesWithPosts = async (
  seriesId: number
): Promise<SeriesDetailResponse> => {
  try {
    const resposne = await apiClient.get<SeriesDetailResponse>(
      `/series/${seriesId}`,
      {}
    );

    return resposne.data;
  } catch (error) {
    console.error("시리즈 상세조회 실패: ", error);
    throw new Error("시리즈 상세조회에 실패했습니다.");
  }
};
