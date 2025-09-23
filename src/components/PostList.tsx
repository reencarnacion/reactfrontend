import React, { useEffect, useState } from "react";
import { createPost, getPosts } from "../api/postApi";
import type { Post } from "../types/Post";

const PostList: React.FC = () => {
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

  // 2. 새로운 게시글 생성
  const handleCreatePost = async () => {
    const newPostData = {
      title: "새로운 React 생성 글",
      content: "프론트엔드에서 성공적으로 백엔드에 전송되었습니다!",
    };
    try {
      const createdPost = await createPost(newPostData);
      setPosts((prevPosts) => [...prevPosts, createdPost]);
      alert(`게시글 생성 성공! ID: ${createdPost.id}`);
    } catch (err) {
      alert(`게시글 생성 실패: ` + (err as Error).message);
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error} </div>;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4">
        게시글 목록 ({posts.length}개)
      </h1>
      <button
        onClick={handleCreatePost}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition-colors"
      >
        새 게시글 등록
      </button>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600 mt-2">{post.content}</p>
            <p className="text-sm text-gray-600 mt-2">ID: {post.id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
