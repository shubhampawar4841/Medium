import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`} className="block">
      <article className="p-6 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
        <div className="flex items-center mb-4">
          <Avatar name={authorName} size="small" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{authorName}</p>
            <div className="flex items-center text-sm text-gray-500">
              <time dateTime={publishedDate}>{publishedDate}</time>
              <span className="mx-1">·</span>
              <span>{`${Math.ceil(content.length / 100)} min read`}</span>
            </div>
          </div>
        </div>
        <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{title}</h2>
        <p className="mb-4 text-base text-gray-500 line-clamp-3">{content}</p>
        <div className="flex items-center text-sm text-gray-500">
          <span className="mr-2 px-2 py-1 rounded-full bg-gray-100">Blog</span>
          <span className="mr-2 px-2 py-1 rounded-full bg-gray-100">React</span>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
