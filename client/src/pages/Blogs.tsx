import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

export const Blogs = () => {
  const {loading, blogs} = useBlogs();

  if (loading) {
    return (
      <div>
        <Appbar/>
        <div className="flex justify-center">
          <div>
            {[...Array(8)].map((_, index) => (
              <BlogSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="">
          {blogs.map(blog => (
            <BlogCard 
              key={blog.id}
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate="23rd June" // You might want to format this properly
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blogs;
