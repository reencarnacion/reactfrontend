import axios from "axios";
import type {
  CreatePostRequest,
  PostListResponse,
  PostResponse,
  PostSearchCondition,
} from "../types/Post";
import apiClient from "./ApiClient";

const POSTS_PER_PAGE = 8;

// 1. 기본 인스턴스 설정
const api = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

// 게시글 생성
export const createPost = async (
  postData: CreatePostRequest
): Promise<PostResponse> => {
  try {
    // 인증 필요 요청에 헤더 토큰 추가
    const response = await apiClient.post("/posts", postData);

    return response.data;
  } catch (error) {
    console.error("게시글 생성 실패: ", error);
    throw new Error("게시글 등록에 실패했습니다.");
  }
};

// 게시글 목록 조회
// Promise<T> 를 통해 타입 안정성 확보 & 코드 가독성 향상
export const getPosts = async (
  page: number = 0,
  condition?: PostSearchCondition
): Promise<PostListResponse[]> => {
  try {
    // GET localhost:5173/api/post (Vite가 8080으로 프록시)
    const response = await api.get<PostListResponse[]>("/posts", {
      params: {
        page: page,
        size: POSTS_PER_PAGE,
        ...condition,
      },
    });

    return response.data;
  } catch (error) {
    console.error("게시글 목록 조회 실패: ", error);
    throw new Error("데이터를 불러오지 못했습니다.");
  }
};

// TODO: 게시글 상세 조회

// 게시글 총 건수 조회
export const getPostsCount = async (
  condition?: PostSearchCondition
): Promise<number> => {
  try {
    const response = await api.get<number>("/posts/count", {
      params: condition,
    });

    return response.data;
  } catch (error) {
    console.error("게시글 총 건수 조회 실패: ", error);
    throw new Error("데이터를 불러오지 못했습니다.");
  }
};
