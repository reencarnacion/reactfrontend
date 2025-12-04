import type { TagResponse } from "../types/Tag";
import apiClient from "./ApiClient";

// 게시글 목록 조회
export const getTags = async (): Promise<TagResponse[]> => {
  try {
    const response = await apiClient.get<TagResponse[]>("/tags");
    return response.data;
  } catch (error) {
    console.log("태그 목록 조회 실패: ", error);
    throw new Error("데이터를 불러오지 못했습니다.");
  }
};
