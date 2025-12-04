// Post Entity
export interface Post {
  id: number;
  title: string;
  content: string;
  createAt: string; // ISO 8601 형식 날짜 문자열
}

// Post 요청 데이터 구조
export interface CreatePostRequest {
  title: string;
  content: string;
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
}

export interface PostSearchCondition {
  tagName?: string;
  category?: string;
  keyword?: string;
}

export interface PostDetailResponse {
  postId: number;
  title: string;
  content: string;
  category: string;
  createAt: string;
  tags: string[];
}

export interface PostNavigationResponse {
  postId: number;
  title: string;
  seriesOrder: number;
}
