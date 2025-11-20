import { Badge, Card } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import { getPost } from "../api/PostApi";
import { useAuth } from "../hooks/useAuth";
import type { PostDetailResponse } from "../types/Post";
import { handleError } from "../utils/notifier";
import { formatTimeAgo } from "../utils/time";

const PostDetailPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { postId } = useParams<{ postId: string }>();
  const postIdNumber = postId ? parseInt(postId, 10) : null;
  const [post, setPost] = useState<PostDetailResponse | null>(null);

  useEffect(() => {
    if (postIdNumber === null) return;

    const fetchPost = async () => {
      try {
        const data = await getPost(postIdNumber);

        setPost(data);
      } catch (error) {
        handleError(error);
      }
    };

    fetchPost();
  }, [postIdNumber]);

  return (
    <div className="container mx-auto p-4">
      {post ? (
        // 게시글 정상 조회 시 렌더링
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {/* 포스트 제목 및 메타데이터 영역 */}
            {/* TODO: 목록으로, 맨 위로, 아래로 등의 편의 버튼 */}
            <header className="mb-6 pb-4 dark:bg-gray-800 bg-gray-200 p-4 rounded-lg">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge
                  color="info"
                  className="text-xs font-semibold uppercase px-3 py-1 mr-2"
                >
                  {post.category}
                </Badge>
                {post.tags.map((tag) => (
                  <Badge
                    color="blue"
                    className="px-2 py-1 text-xs font-medium rounded-md"
                    key={tag}
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
              <div className="flex items-center text-sm text-gray-400 dark:text-gray-500 mt-2">
                <span>{new Date(post.createAt).toLocaleDateString()}</span>
                <span className="mx-2">|</span>
                <span>{`${formatTimeAgo(post.createAt)}`}</span>
              </div>
            </header>

            {/* 마크다운 콘텐츠 영역 */}
            <div className="prose dark:prose-invert prose-sm max-w-none p-4">
              <ReactMarkdown
                children={post.content}
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ className, children, ...props }) {
                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              />
            </div>
          </div>

          <aside className="lg:col-span-1 flex flex-col gap-4">
            {isAuthenticated ? (
              <Card>
                <h6 className="text-lg font-bold tracking-normal text-gray-900 dark:text-white">
                  게시글 관리
                </h6>
                <div className="flex flex-row gap-2">
                  {/* TODO: 수정, 삭제 기능 개발 */}
                  <span>수정</span>
                  <span>삭제</span>
                </div>
              </Card>
            ) : null}

            <Card>
              <h3 className="text-lg font-semibold mb-3">탐색</h3>
              관련 글 목록
              <br />
              마크다운 목차 등을 넣어줄 예정
            </Card>
          </aside>
        </div>
      ) : (
        "게시글 불러오기 에러."
      )}
    </div>
  );
};

export default PostDetailPage;
