import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { getPosts } from "../api/PostApi";
import { getTags } from "../api/TagApi";
import CategoryCard from "../components/ui/CategoryCard";
import PostCard from "../components/ui/PostCard";
import TagCard from "../components/ui/TagCard";
import type { PostListResponse } from "../types/Post";
import type { TagResponse } from "../types/Tag";

const HomePage: React.FC = () => {
  const [latestPosts, setLatestPosts] = useState<PostListResponse[]>([]);
  const [allTags, setAllTags] = useState<TagResponse[]>([]);

  useEffect(() => {
    // 최신 게시물 조회
    const fetchLatestPosts = async () => {
      // TODO: 홈페이지용 API 추가해서 변경: 최신 3개만 조회+전체 글 갯수
      const post = await getPosts();

      setLatestPosts(post.slice(0, 4));
    };
    fetchLatestPosts();

    // 게시글 태그 목록 조회
    const fetchAllTags = async () => {
      const tags = await getTags();

      setAllTags(tags);
    };
    fetchAllTags();
  }, []);

  // 화면
  return (
    <div className="mx-auto px-4 py-10 sm:px-6 lg:px-8">
      {/* 메인 3열 그리드 컨테이너 */}
      <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-8">
        {/* 좌측 카드 영역 */}
        <aside className="md:col-span-1 flex flex-col gap-4">
          <Card>
            <h5 className="text-xl font-bold tracking-normal text-gray-900 dark:text-white">
              SW로그
            </h5>
            <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
              기록
            </p>
          </Card>
          <CategoryCard />
        </aside>

        {/* 중앙 게시글 목록 영역 */}
        <main className="md:col-span-3">
          {/* TODO: 게시판 구분 상관없이 조회되어야 함 */}
          <hr className="border-gray-200 dark:border-gray-700" />
          <p className="text-gray-500 dark:text-gray-400 my-4">
            최근 게시 총 <b>{latestPosts.length}</b> 건
          </p>
          <hr className="mb-4 border-gray-200 dark:border-gray-700" />

          <div className="flex flex-col gap-4">
            {latestPosts.map((post) => (
              <div key={post.postId}>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </main>

        {/* 우측 구분 영역 */}
        <aside className="md:col-span-1">
          <TagCard tags={allTags} />
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
