import axios from "axios";
import type { TagResponse } from "../types/Tag";

const API_URL = "/api/tags";

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

// 게시글 목록 조회
export const getTags = async (): Promise<TagResponse[]> => {
  try {
    const response = await api.get<TagResponse[]>("");
    return response.data;
  } catch (error) {
    console.log("태그 목록 조회 실패: ", error);
    throw new Error("데이터를 불러오지 못했습니다.");
  }
};
