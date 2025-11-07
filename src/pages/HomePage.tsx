import { Badge, Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaGamepad } from "react-icons/fa";
import {
  HiArrowRight,
  HiBookOpen,
  HiCode,
  HiPlay,
  HiTranslate,
} from "react-icons/hi";
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
    <div className="mx-auto px-4 py-10 sm:px-6 lg:px-8">
      {/* 블로그 소개 */}
      {/* <section className="text-left mb-10">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          SW 로그
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6"></p>
        <Link className="underline" to="/posts">
          게시판은 여기
        </Link>
      </section> */}

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
              <br />
              레이아웃 수정중
            </p>
          </Card>
          <Card>
            <h5 className="text-xl font-bold tracking-normal text-gray-900 dark:text-white">
              카테고리 바로가기
            </h5>
            <div className="flex flex-col gap-1">
              <Link
                to="/#"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HiCode className="w-5 h-5" />
                  <span className="text-gray-900 dark:text-white">개발</span>
                </div>
                <HiArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/#"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HiTranslate className="w-5 h-5" />
                  <span className="text-gray-900 dark:text-white">외국어</span>
                </div>
                <HiArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/#"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HiBookOpen className="w-5 h-5" />
                  <span className="text-gray-900 dark:text-white">독서</span>
                </div>
                <HiArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/#"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HiPlay className="w-5 h-5" />
                  <span className="text-gray-900 dark:text-white">
                    영상 시청
                  </span>
                </div>
                <HiArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/#"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FaGamepad className="w-5 h-5" />
                  <span className="text-gray-900 dark:text-white">게임</span>
                </div>
                <HiArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </Card>
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
              <div key={post.id}>
                <div className="bg-transparent shadow-none border-0">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex flex-wrap gap-2">
                      {/* TODO: 게시글 해시태그 백엔드 개발 */}
                      {["개발", "TBD"].map((tag) => (
                        <Badge
                          color="blue"
                          className="px-2 py-1 text-xs font-medium rounded-md"
                          key={tag}
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      1년 이상 경과
                    </span>
                  </div>

                  <Link to={`/posts/${post.id}`}>
                    <h5 className="text-xl font-bold tracking-tight mb-2 text-gray-900 dark:text-white hover:underline">
                      {post.title}
                    </h5>
                  </Link>

                  <p className="text-base font-normal tracking-tight text-gray-700 dark:text-gray-400">
                    {post.content}
                  </p>

                  <hr className="mt-4 border-gray-200 dark:border-gray-700" />
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* 우측 구분 영역 */}
        <aside className="md:col-span-1">
          <Card>
            <h5 className="text-xl font-bold tracking-normal text-gray-900 dark:text-white">
              해시태그
            </h5>
            <div className="flex flex-wrap gap-2">
              {/* TODO: 게시물 해시태그 기능 */}
              {[
                "React",
                "Typescript",
                "Spring boot",
                "JWT",
                "日本語",
                "中文",
                "소설",
                "역사",
                "애니",
                "RPG",
              ].map((tag) => (
                <a href={`/post?tag=${tag}`} key={tag}>
                  <Badge
                    color="blue"
                    className="px-3 py-1 font-medium rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    #{tag}
                  </Badge>
                </a>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
