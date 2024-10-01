import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { useEffect } from "react";
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blogs = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, []);

  const { loading, blogs } = useBlogs();

  if(loading){
    return (
      <div>
        <Appbar />
        <div className="mt-20 flex justify-center">
          <div className="max-w-2xl w-full">
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Appbar />
      <h1 className="flex justify-center border-b-1 text-2xl pt-3 font-extralight">
        Discover Blogs
      </h1>
      <div className="mt-3 mb-3 ml-[29rem] border max-w-xl"></div>
      <div className="flex justify-center">
        <div className="max-w-2xl">
          {blogs.map((blog, index) => (
            <BlogCard
              key={index}
              id={`${blog.id}`}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate="21st Feb 2024"
            />
          ))}
        </div>
      </div>
    </>
  );
};