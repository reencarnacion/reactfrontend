import axios from "axios";
// Linter 권장: type으로 선언
import type { CreatePostRequest, Post } from "../types/Post";

// 1. 기본 인스턴스 설정
const api = axios.create({
  baseURL: "/api/post",
  timeout: 5000,
});

// 게시글 목록 조회
// Promise<T> 를 통해 타입 안정성 확보 & 코드 가독성 향상
export const getPosts = async (): Promise<Post[]> => {
  try {
    // GET localhost:5173/api/post (Vite가 8080으로 프록시)
    const response = await api.get<Post[]>("");
    return response.data;
  } catch (error) {
    console.error("게시글 목록 조회 실패: ", error);
    throw new Error("데이터를 불러오지 못했습니다.");
  }
};

// 게시글 생성
export const createPost = async (
  postData: CreatePostRequest
): Promise<Post> => {
  try {
    // POST localhost:5173/api/post
    const response = await api.post<Post>("", postData);
    return response.data;
  } catch (error) {
    console.error("게시글 생성 실패: ", error);
    throw new Error("게시글 등록에 실패했습니다.");
  }
};
