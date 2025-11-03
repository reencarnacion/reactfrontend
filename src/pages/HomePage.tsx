import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../api/PostApi";
import type { Post } from "../types/Post";

const HomePage: React.FC = () => {
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      // TODO: 홈페이지용 API 추가해서 변경
      const post = await getPosts();
      setLatestPosts(post.slice(0, 3)); // 다 가져와서 3개쓰게 되어있음
    };
    fetchLatestPosts();
  }, []);

  // 화면
  return (
    <div className="flex flex-col items-start py-10">
      <section className="text-left mb-10">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          SW 로그
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          이것저것 하면서 기록합니다. 레이아웃은 일정 수준 개발되고 나면
          참조자료 찾아서 수정할 예정..ㅠ
        </p>
        <Link className="underline" to="/posts">
          게시판은 여기
        </Link>
      </section>

      <section className="w-full max-w-5xl">
        {/* TODO: 게시판 구분 상관없이 조회되어야 함 */}
        <h2 className="text-3xl font-bold mb-6 text-center">최신 게시글</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <Card key={post.id}>
              <h5 className="text-xl font-bold tracking-normal text-gray-900 dark:text-white">
                {post.title}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {post.content}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
