import type { PostNavigationResponse } from "./Post";

export interface SeriesCreateRequest {
  title: string;
  description: string;
}

export interface SeriesCreateResponse {
  seriesId: number;
  message: string;
}

export interface SeriesResponse {
  seriesId: number;
  title: string;
  description: string;
}

export interface SeriesDetailResponse {
  seriesId: number;
  title: string;
  description: string;
  posts: PostNavigationResponse[];
}
