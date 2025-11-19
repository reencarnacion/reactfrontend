import { Card } from "flowbite-react";
import { FaGamepad } from "react-icons/fa";
import {
  HiArrowRight,
  HiBookOpen,
  HiCode,
  HiPlay,
  HiTranslate,
} from "react-icons/hi";
import { Link } from "react-router-dom";

interface Category {
  icon: React.ReactNode;
  label: string;
}

const defaultCategories: Category[] = [
  {
    icon: <HiCode className="w-5 h-5" />,
    label: "개발",
  },
  {
    icon: <HiTranslate className="w-5 h-5" />,
    label: "외국어",
  },
  {
    icon: <HiBookOpen className="w-5 h-5" />,
    label: "독서",
  },
  {
    icon: <HiPlay className="w-5 h-5" />,
    label: "영상 시청",
  },
  {
    icon: <FaGamepad className="w-5 h-5" />,
    label: "게임",
  },
];

interface CategoryCardProps {
  categories?: Category[];
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  categories = defaultCategories,
}) => (
  <Card>
    <h5 className="text-xl font-bold tracking-normal text-gray-900 dark:text-white">
      카테고리 바로가기
    </h5>
    <div className="flex flex-col gap-1">
      {categories.map((cat) => {
        // 일단 여러가지 방식으로 해 둠
        const targetTo = `/posts?category=${encodeURIComponent(cat.label)}`;

        return (
          <Link
            to={targetTo}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            key={cat.label}
          >
            <div className="flex items-center gap-3">
              {cat.icon}
              <span className="text-gray-900 dark:text-white">{cat.label}</span>
            </div>
            <HiArrowRight className="w-5 h-5" />
          </Link>
        );
      })}
    </div>
  </Card>
);

export default CategoryCard;
