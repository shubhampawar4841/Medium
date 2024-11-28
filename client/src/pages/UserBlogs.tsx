import Appbar from "../components/Appbar";
import Avatar from "../components/Avatar";
import BlogCard from "../components/BlogCard";
import { useBlog } from "../hooks";  // Changed to use `useBlog`

export default function UserBlogs() {
  const { loading, userData } = useBlog();  // Changed hook to `useBlog`
  
  if (loading) {
    return (
      <div>
        <Appbar write={true} />
        <div className="flex justify-center pt-16">
          <div className="flex flex-col justify-center w-5/6 gap-7 lg:w-1/2 md:w-2/3">
            <p className="h-4 bg-gray-200 rounded-full" style={{ width: "40%" }}></p>
            <ul className="mt-5 space-y-3">
              <li className="w-full h-4 bg-gray-200 rounded-full"></li>
              <li className="w-full h-4 bg-gray-200 rounded-full"></li>
              <li className="w-full h-4 bg-gray-200 rounded-full"></li>
              <li className="w-full h-4 bg-gray-200 rounded-full"></li>
            </ul>
            <p className="h-4 bg-gray-200 rounded-full" style={{ width: "40%" }}></p>
            <ul className="mt-5 space-y-3">
              <li className="w-full h-4 bg-gray-200 rounded-full"></li>
              <li className="w-full h-4 bg-gray-200 rounded-full"></li>
              <li className="w-full h-4 bg-gray-200 rounded-full"></li>
              <li className="w-full h-4 bg-gray-200 rounded-full"></li>
            </ul>
            <p className="h-4 bg-gray-200 rounded-full" style={{ width: "40%" }}></p>
            <ul className="mt-5 space-y-3">
              <li className="w-full h-4 bg-gray-200 rounded-full"></li>
              <li className="w-full h-4 bg-gray-200 rounded-full"></li>
              <li className="w-full h-4 bg-gray-200 rounded-full"></li>
              <li className="w-full h-4 bg-gray-200 rounded-full"></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar write={true} />
      <div>
        <div className="p-6 px-32 overflow-y-auto text-2xl font-bold first-letter:uppercase">
          All Blogs:
        </div>
        <div className="grid pt-6 lg:grid-cols-10">
          <div className="col-span-7 border-r">
            <div className="flex flex-col gap-6">
              {userData?.blogs?.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </div>
          <div className="col-span-3 pl-8">
            <div className="sticky top-0">
              <div className="bg-white p-4 rounded-xl shadow-md">
                <div className="flex items-center space-x-4">
                  <Avatar src={userData?.avatar} />
                  <div>
                    <h3 className="text-xl font-semibold">{userData?.name}</h3>
                    <p className="text-sm text-gray-500">{userData?.email}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="font-medium text-lg">Recent Blogs</p>
                  <ul className="mt-4 space-y-4">
                    {userData?.recentBlogs?.map((blog) => (
                      <li key={blog.id} className="text-sm text-blue-500">
                        {blog.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
