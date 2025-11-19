import { Badge, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import type { TagResponse } from "../../types/Tag";

interface TagCardProps {
  tags: TagResponse[];
}

const TagCard: React.FC<TagCardProps> = ({ tags }) => (
  <Card>
    <h5 className="text-xl font-bold tracking-normal text-gray-900 dark:text-white">
      해시태그
    </h5>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const params = new URLSearchParams();
        params.set("tagName", tag.name);
        const targetTo = `/posts?${params.toString()}`;

        return (
          <Link to={targetTo} key={tag.name}>
            <Badge
              color="blue"
              className="px-3 py-1 font-medium rounded-lg hover:bg-blue-600 transition-colors"
            >
              #{tag.name}
            </Badge>
          </Link>
        );
      })}
    </div>
  </Card>
);

export default TagCard;
