import { Card, ListGroup, ListGroupItem, Tooltip } from "flowbite-react";
import type React from "react";
import { useEffect, useRef } from "react";
import { HiInformationCircle } from "react-icons/hi";

interface SeriesPostItem {
  postId: number;
  title: string;
  seriesOrder: number;
}

interface SeriesNavigatorProps {
  seriesTitle: string;
  seriesPosts: SeriesPostItem[];
  currentPostId: number;
  seriesDescription: string;
}

const SeriesNavigator: React.FC<SeriesNavigatorProps> = ({
  seriesTitle,
  seriesPosts,
  currentPostId,
  seriesDescription,
}) => {
  const currentItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentItemRef.current) {
      currentItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [seriesPosts, currentPostId]);

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        {seriesTitle} ({seriesPosts.length}건)
        <Tooltip content={seriesDescription} placement="top" style="light">
          <HiInformationCircle
            className="w-5 h-5 text-gray-500 cursor-pointer 
          hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          />
        </Tooltip>
      </h3>
      <div className="h-[250px] overflow-y-auto border rounded-lg dark:border-gray-700">
        <ListGroup>
          {seriesPosts.map((post) => {
            const isCurrent = post.postId === currentPostId;

            return (
              <div key={post.postId} ref={isCurrent ? currentItemRef : null}>
                <ListGroupItem
                  href={`/posts/${post.postId}`}
                  className={`!p-3 ${
                    isCurrent
                      ? "font-bold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                      : "hover:bg-gray-50 dark:hover:bg-gray-600"
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="truncate">
                      {post.seriesOrder}. {post.title}
                    </span>
                    {isCurrent && (
                      <span className="text-xs text-blue-700 dark:text-blue-200 ml-2">
                        (현재 글)
                      </span>
                    )}
                  </div>
                </ListGroupItem>
              </div>
            );
          })}
        </ListGroup>
      </div>
    </Card>
  );
};

export default SeriesNavigator;
