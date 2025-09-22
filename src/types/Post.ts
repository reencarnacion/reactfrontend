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
