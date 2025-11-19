import { Button, Pagination } from "flowbite-react";
import React, { useEffect, useMemo, useState } from "react";
import { HiPencil } from "react-icons/hi";
import { Link, useSearchParams } from "react-router-dom";
import { getPosts, getPostsCount } from "../api/PostApi";
import { getTags } from "../api/TagApi";
import CategoryCard from "../components/ui/CategoryCard";
import PostCard from "../components/ui/PostCard";
import TagCard from "../components/ui/TagCard";
import { useAuth } from "../hooks/useAuth";
import type { PostListResponse, PostSearchCondition } from "../types/Post";
import type { TagResponse } from "../types/Tag";
import { handleError } from "../utils/notifier";

const PostListPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<PostListResponse[]>([]);
  const [allTags, setAllTags] = useState<TagResponse[]>([]);
  const [currentTitle, setCurrentTitle] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParam] = useSearchParams();

  const currentCondition: PostSearchCondition = useMemo(() => {
    return {
      tagName: searchParam.get("tagName") || undefined,
      category: searchParam.get("category") || undefined,
      keyword: searchParam.get("keyword") || undefined,
    };
  }, [searchParam]);

  // 제목 설정
  const updateTitle = (condition: PostSearchCondition) => {
    if (condition.tagName) {
      setCurrentTitle(`#${condition.tagName} 태그 게시글`);
    } else if (condition.category) {
      setCurrentTitle(`${condition.category} 게시글`);
    } else if (condition.keyword) {
      setCurrentTitle(`'${condition.keyword}' 검색 결과`);
    } else {
      setCurrentTitle("전체 게시글 목록");
    }
  };

  // 게시글 목록 조회
  const fetchPosts = async (cPage: number, condition: PostSearchCondition) => {
    try {
      const data = await getPosts(cPage - 1, condition);
      setPosts(data);
    } catch (err) {
      handleError(err);
    }
  };

  // 게시글 총 건수 조회
  const fetchPostsCount = async (condition: PostSearchCondition) => {
    try {
      const count = await getPostsCount(condition);

      setTotalPages(Math.max(1, Math.ceil(count / 8)));
    } catch (err) {
      handleError(err);
    }
  };

  // 1. 컴포넌트 마운트 초기 조회
  useEffect(() => {
    fetchPostsCount(currentCondition);
    fetchPosts(1, currentCondition);

    // 게시글 태그 목록 조회
    const fetchAllTags = async () => {
      const tags = await getTags();
      setAllTags(tags);
    };
    fetchAllTags();

    // 게시판 구분 보여주기
    updateTitle(currentCondition);
  }, [currentCondition]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    fetchPosts(page, currentCondition);
  };

  return (
    <div className="mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-8">
        {/* 좌측 게시글 영역 */}
        <aside className="md:col-span-4 flex flex-col gap-2">
          {/* 게시글 헤더 */}
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {currentTitle}
            </h2>
            {isAuthenticated ? (
              <Link to="write">
                <Button>
                  <HiPencil className="mr-2 h-4 w-4" />새 게시글 등록
                </Button>
              </Link>
            ) : (
              <></>
            )}
          </div>
          <hr className="mb-4 border-gray-200 dark:border-gray-700" />

          {/* 게시글 목록: 2열 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
            {posts.map((post: PostListResponse) => (
              <PostCard key={post.postId} post={post} />
            ))}
          </div>
          {/* 페이징 컴포넌트 자리: flowbite 컴포넌트 바로 쓰기 */}
          <div className="flex overflow-x-auto justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              showIcons
              nextLabel="다음"
              previousLabel="이전"
            />
          </div>
        </aside>

        {/* 우측 카드 영역 */}
        <aside className="md:col-span-1 flex flex-col gap-4">
          <TagCard tags={allTags} />
          <CategoryCard />
        </aside>
      </div>
    </div>
  );
};

export default PostListPage;
