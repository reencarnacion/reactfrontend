import type { Options } from "easymde";
import "easymde/dist/easymde.min.css";
import {
  Button,
  Card,
  Label,
  Select,
  TextInput,
  ToggleSwitch,
} from "flowbite-react";
import React, { useEffect, useMemo, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SimpleMdeEditor from "react-simplemde-editor";
import { uploadImage } from "../api/ImageApi";
import { createPost, getPost, updatePost } from "../api/PostApi";
import { getAllSeries } from "../api/SeriesApi";
import type { SeriesResponse } from "../types/Series";
import { handleError, handleSuccess } from "../utils/notifier";

const PostWritePage: React.FC = () => {
  const { postId } = useParams<{ postId?: string }>();
  const isEditMode = useMemo(() => {
    const id = Number(postId);
    return !!postId && !isNaN(id) && id > 0;
  }, [postId]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("개발");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [seriesId, setSeriesId] = useState<number | null>(null);
  const [seriesOrder, setSeriesOrder] = useState<number | null>(null);
  const [allSeries, setAllSeries] = useState<SeriesResponse[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 시리즈 목록
    const fetchAllSeries = async () => {
      try {
        const data = await getAllSeries();
        setAllSeries(data);
      } catch (err) {
        handleError(err);
      }
    };

    fetchAllSeries();

    // 수정 모드인지
    if (isEditMode && postId) {
      const fetchPost = async () => {
        try {
          const data = await getPost(Number(postId));

          setTitle(data.title);
          setContent(data.content);
          setCategory(data.category);
          setTags(data.tags.join(", "));
          setIsPrivate(data.isPrivate);
          setSeriesId(data.seriesId);
          setSeriesOrder(data.seriesOrder);
        } catch (error) {
          handleError(error);
        }
      };

      fetchPost();
    }
  }, [isEditMode, postId]);

  // 에디터 옵션
  const mdeOptions: Options = useMemo(() => {
    return {
      spellChecker: false,
      status: false,
      minHeight: "180px",
      toolbar: [
        "heading",
        "bold",
        "italic",
        "link",
        "image",
        "|",
        "table",
        "unordered-list",
        "ordered-list",
        "quote",
        "|",
        "preview",
        "side-by-side",
        "fullscreen",
      ],
      readOnly: false,
      placeholder: "여기에 내용을 작성하세요...",
      autofocus: true,
      sideBySideFullscreen: false,
      syncSideBySidePreviewScroll: true,
      uploadImage: true,
      imageAccept: "image/*",
      imageUploadText: "이미지 업로드 중...",
      imageErrorText: "이미지 업로드 실패",
      imageUploadFunction: async (
        file: File,
        onSuccess: (url: string) => void,
        onError: (error: string) => void
      ) => {
        try {
          const imageUrl = await uploadImage(file);

          onSuccess(imageUrl);
        } catch (err) {
          console.error("업로드 에러:", err);
          onError("이미지 업로드에 실패했습니다.");

          handleError(err);
        }
      },
    };
  }, []);

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // 게시글 서버 전송 로직
    const savePost = {
      title,
      content,
      category,
      isPrivate,
      tags: tags.split(","),
      seriesId,
      seriesOrder,
    };

    try {
      let savedPost;

      if (isEditMode) {
        savedPost = await updatePost(savePost, Number(postId));
      } else {
        savedPost = await createPost(savePost);
      }

      handleSuccess(`게시글 작성완료 [${savedPost.postId}]`, () =>
        navigate("/posts")
      );
    } catch (err) {
      handleError(err);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCancel = () => {
    navigate("/posts");
  };

  return (
    <div className="mx-auto max-w-7xl py-10 px-4">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
        새 글 작성
      </h1>

      <Card className="p-2 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-24 shrink-0">
            <Label htmlFor="title">제목</Label>
          </div>
          <div className="flex-1">
            <TextInput
              id="title"
              type="text"
              placeholder="게시글 제목을 입력하세요."
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-24 shrink-0">
              <Label htmlFor="category">카테고리</Label>
            </div>
            <div className="flex-1">
              <Select
                id="category"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>개발</option>
                <option>외국어</option>
                <option>독서</option>
                <option>영상 시청</option>
                <option>게임</option>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 shrink-0">
              <Label htmlFor="isPrivate">비밀글 여부</Label>
            </div>
            <div className="flex-1 flex items-center">
              <ToggleSwitch
                id="isPrivate"
                checked={isPrivate}
                onChange={setIsPrivate}
                label={isPrivate ? "비밀글 (Private)" : "공개글 (Public)"}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-24 shrink-0">
              <Label htmlFor="series-select">시리즈</Label>
            </div>
            <div className="flex-1">
              <Select
                id="series-select"
                onChange={(e) => setSeriesId(Number(e.target.value))}
                required={false}
              >
                <option value="">-- 선택 안 함 --</option>
                {allSeries.map((series) => (
                  <option key={series.seriesId} value={series.seriesId}>
                    {series.title}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 shrink-0">
              <Label htmlFor="series-order">시리즈 순서</Label>
            </div>
            <TextInput
              id="series-order"
              type="number"
              min="1"
              placeholder="시리즈 내 순서 (예: 1)"
              value={seriesOrder ?? ""}
              onChange={(e) => setSeriesOrder(Number(e.target.value))}
              disabled={seriesId === null}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-30 shrink-0">
            <Label htmlFor="tags">태그 (쉼표로 구분)</Label>
          </div>
          <div className="flex-1">
            <TextInput
              id="tags"
              type="text"
              placeholder="예: Spring Boot, JWT, 성능 최적화"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="mb-2 block">
            <div className="mb-3">
              <Label htmlFor="content">본문 내용 (Markdown)</Label>
            </div>
            <SimpleMdeEditor
              value={content}
              onChange={handleContentChange}
              options={mdeOptions}
              className="markdown-editor-simplemde"
            />
          </div>
        </div>
      </Card>

      <div className="flex justify-end gap-2">
        <Button onClick={handleCancel} color="alternative">
          취소
        </Button>
        <Button onClick={handleSubmit} color="cyan">
          등록
        </Button>
      </div>
    </div>
  );
};

export default PostWritePage;
