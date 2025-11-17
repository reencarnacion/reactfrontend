import { Badge } from "flowbite-react";
import { Link } from "react-router-dom";
import type { PostListResponse } from "../../types/Post";

interface PostCardProps {
  post: PostListResponse;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-transparent shadow-none border-0">
      <div className="flex justify-between items-center mb-3">
        <div className="flex flex-wrap gap-2">
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
        <span className="text-xs text-gray-500 dark:text-gray-400">
          1년 이상 경과
        </span>
      </div>

      <Link to={`/posts/${post.postId}`}>
        <h5 className="text-xl font-bold tracking-tight mb-2 text-gray-900 dark:text-white hover:underline">
          {post.title}
        </h5>
      </Link>

      <p className="text-base font-normal tracking-tight text-gray-700 dark:text-gray-400">
        {post.content}
      </p>

      <hr className="mt-4 border-gray-200 dark:border-gray-700" />
    </div>
  );
};

export default PostCard;
