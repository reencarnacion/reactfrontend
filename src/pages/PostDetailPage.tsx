import { Badge, Button, Card } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import {
  HiArrowDown,
  HiArrowUp,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { getPost } from "../api/PostApi";
import { useAuth } from "../hooks/useAuth";
import type { PostDetailResponse } from "../types/Post";
import { handleError } from "../utils/notifier";
import { formatTimeAgo } from "../utils/time";

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
  depth?: string;
}

const PostDetailPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { postId } = useParams<{ postId: string }>();
  const postIdNumber = postId ? parseInt(postId, 10) : null;
  const [post, setPost] = useState<PostDetailResponse | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const [toc, setToc] = useState<TableOfContentsItem[]>([]);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 최초 조회
  useEffect(() => {
    if (postIdNumber === null) return;

    // 게시글 조회
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

  // 게시글 조회 완료 후
  useEffect(() => {
    // 본문 제목 태그 목차 생성
    const headings = document.querySelectorAll<HTMLHeadingElement>(
      ".prose h2, .prose h3, .prose h4, .prose h5, .prose h6"
    );
    const tocItems: TableOfContentsItem[] = [];
    const sectionNumbers: number[] = [0, 0, 0, 0, 0];

    headings.forEach((heading) => {
      if (!heading.id) return;

      const index = parseInt(heading.tagName.substring(1), 10) - 2;
      sectionNumbers[index] += 1;
      for (let i = index + 1; i < sectionNumbers.length; i++) {
        sectionNumbers[i] = 0;
      }
      const sectionNumber = sectionNumbers
        .slice(0, index + 1)
        .filter((num) => num > 0)
        .join(".");

      tocItems.push({
        id: heading.id,
        text: heading.innerText,
        level: parseInt(heading.tagName.substring(1), 10),
        depth: sectionNumber,
      });
    });

    setToc(tocItems);

    // 스크롤 이벤트
    const handleScroll = () => {
      const currentScrollPost = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      setShowScrollTop(currentScrollPost > 300);
      setShowScrollBottom(currentScrollPost < maxScroll * 0.7);
    };

    window.addEventListener("scroll", handleScroll);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [post]);

  const handleGoback = () => {
    navigate(-1);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    if (!mainContentRef.current) return;

    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const targetY = documentHeight - windowHeight - 80;

    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div ref={mainContentRef} className="container mx-auto p-4">
        {post ? (
          // 게시글 정상 조회 시 렌더링
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <Button
                color="light"
                size="sm"
                className="mb-4"
                onClick={handleGoback}
              >
                이전 화면으로
              </Button>
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
                  rehypePlugins={[
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: "wrap" }],
                  ]}
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

              <footer className="mt-4 p-4 border-t dark:border-gray-700 border-gray-300">
                <Button
                  color="light"
                  size="sm"
                  className="mb-4"
                  onClick={handleGoback}
                >
                  이전 화면으로
                </Button>
              </footer>
            </div>

            <aside className="lg:col-span-1 flex flex-col gap-4">
              {/* 게시글 관리 영역 */}
              {isAuthenticated ? (
                <Card>
                  <h6 className="text-lg font-bold tracking-normal text-gray-900 dark:text-white">
                    게시글 관리
                  </h6>
                  <div className="flex flex-row gap-2">
                    <Button
                      color="blue"
                      size="sm"
                      onClick={() => {
                        console.log("수정 페이지로 이동 개발중..");
                      }}
                    >
                      <HiOutlinePencil className="mr-2 h-5 w-5" />
                      수정
                    </Button>
                    <Button
                      color="red"
                      size="sm"
                      onClick={() => {
                        if (
                          window.confirm("정말로 이 게시글을 삭제하시겠습니까?")
                        ) {
                          console.log("삭제 기능 개발중..");
                        }
                      }}
                    >
                      <HiOutlineTrash className="mr-2 h-5 w-5" />
                      삭제
                    </Button>
                  </div>
                </Card>
              ) : null}

              <Card>
                <h3 className="text-lg font-semibold mb-3">목차</h3>
                <ul className="space-y-2 mt-2">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block transition-colors hover:underline"
                        onClick={(e) => {
                          e.preventDefault();
                          const target = document.getElementById(item.id);

                          if (target) {
                            target.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          }
                        }}
                      >
                        <span className="font-semibold mr-1">{item.depth}</span>
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold mb-3">시리즈 영역</h3>
                <p>시리즈 기능은 현재 개발 중입니다.</p>
              </Card>
            </aside>
          </div>
        ) : (
          "게시글 불러오기 에러."
        )}
      </div>

      {/* 플로팅 버튼 그룹 */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-1">
        {showScrollTop && (
          <Button
            color="dark"
            pill
            size="lg"
            onClick={scrollToTop}
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            <HiArrowUp className="h-6 w-6" />
          </Button>
        )}

        {showScrollBottom && (
          <Button
            color="dark"
            pill
            size="lg"
            onClick={scrollToBottom}
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            <HiArrowDown className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default PostDetailPage;
