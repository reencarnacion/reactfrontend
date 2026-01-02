import type { ImageResponse } from "../types/Image";
import apiClient from "./ApiClient";

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await apiClient.post<ImageResponse>(
      "/upload/image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.url;
  } catch (error) {
    console.error("이미지 업로드 실패: ", error);
    throw new Error("이미지 업로드에 실패했습니다.");
  }
};
