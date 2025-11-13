// ProblemDetail(RFC 7807) 표준 오류 인터페이스

export interface ProblemDetail {
  title: string;
  status: number;
  detail: string;
  errors: Record<string, string>;
  [key: string]: unknown;
}

export interface StandardizeError extends Error {
  status: number;
  title?: string;
  errors?: Record<string, string>;
}
