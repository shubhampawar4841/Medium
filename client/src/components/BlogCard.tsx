
import { Link } from "react-router-dom";

type BlogCardProps = {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
};

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border-b-[0.01rem] pb-3 border-gray-300 cursor-pointer">
        <div className="flex gap-2 items-center">
          <Avatar size={"small"} name={authorName} />
          <div className="font-normal text-sm">{authorName}</div>
          <div className="text-xs text-slate-600">&bull;</div>
          <div className="font-thin text-xs text-slate-500">
            {publishedDate}
          </div>
        </div>
        <div className="text-xl font-bold pt-2">{title}</div>
        <div className="font-light text-md">
          {content.slice(0, 250)}{content.length>250?"...":""}
        </div>
        <div className="text-slate-500 text-xs font-thin pt-2">{`${Math.ceil(
          content.length / 100
        )} min read`}</div>
      </div>
    </Link>
  );
};

export function Avatar({ name, size }: { name: string; size?: string }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${size=="big"?"w-8 h-8":"w-4 h-4"} overflow-hidden rounded-full bg-gray-600`}
    >
      <span className="font-medium text-xs text-gray-300">{name[0]}</span>
    </div>
  );
}
