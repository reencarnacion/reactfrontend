import { Button, Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../api/PostApi";
import { useAuth } from "../hooks/useAuth";
import type { Post } from "../types/Post";

const PostList: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. 컴포넌트 마운트 시 게시글 목록 조회
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error} </div>;

  return (
    <>
      <div className="container mx-auto p-4 max-w-5xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">게시글 목록 ({posts.length}개)</h1>
          {isAuthenticated ? (
            <Link to="write">
              <Button>새 게시글 등록</Button>
            </Link>
          ) : (
            <></>
          )}
        </div>

        {/* 그리드 레이아웃 적용 */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {post.title}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {post.content}
              </p>
            </Card>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PostList;
