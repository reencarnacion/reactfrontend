// Post Entity
export interface Post {
  id: number;
  title: string;
  content: string;
  createAt: string; // ISO 8601 형식 날짜 문자열
}

// Post 요청 데이터 구조
export interface PostCreateRequest {
  title: string;
  content: string;
  category: string;
  isPrivate: boolean;
  tags: string[];
  seriesId: number | null;
  seriesOrder: number | null;
}

// Post 검색조건
export interface PostSearchCondition {
  tagName?: string;
  category?: string;
  keyword?: string;
}

// Post CUD 응답 데이터 구조
export interface PostResponse {
  postId: number;
  title: string;
  message: string;
}

export interface PostListResponse {
  postId: number;
  title: string;
  content: string;
  category: string;
  createAt: string;
  tags: string[];
  seriesId: number;
  seriesTitle: string;
  seriesOrder: number;
}

export interface PostDetailResponse {
  postId: number;
  title: string;
  content: string;
  category: string;
  createAt: string;
  tags: string[];
  seriesId: number;
  seriesTitle: string;
  seriesOrder: number;
}

export interface PostNavigationResponse {
  postId: number;
  title: string;
  seriesOrder: number;
}
