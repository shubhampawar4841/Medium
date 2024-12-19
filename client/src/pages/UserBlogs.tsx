import { useState } from 'react';
import Appbar from "../components/Appbar";
import Avatar from "../components/Avatar";
import BlogCard from "../components/BlogCard";
import { useUserBoth } from "../hooks";

export default function UserBlogs() {
  const { loading, userData } = useUserBoth();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'published' | 'draft'>('all');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Appbar write={true} />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredPosts = userData?.posts.filter(blog => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'published') return blog.published;
    if (selectedFilter === 'draft') return !blog.published;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Appbar write={true} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <main className="lg:w-2/3">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">My Blogs</h1>
            <div className="mb-6 flex space-x-4">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-4 py-2 rounded-full ${
                  selectedFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedFilter('published')}
                className={`px-4 py-2 rounded-full ${
                  selectedFilter === 'published'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Published
              </button>
              <button
                onClick={() => setSelectedFilter('draft')}
                className={`px-4 py-2 rounded-full ${
                  selectedFilter === 'draft'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Drafts
              </button>
            </div>
            <div className="space-y-6">
              {filteredPosts?.map((blog) => (
                <div key={blog.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          blog.published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(blog.postedOn).toLocaleDateString()}
                      </span>
                    </div>
                    <BlogCard
                      authorId={blog.authorId}
                      id={blog.id}
                      authorName={userData.name}
                      content={blog.content}
                      title={blog.title}
                      publishedDate={blog.postedOn.substring(0, 10)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </main>
          <aside className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Author</h2>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar size="big" name={userData?.name!} />
                <div>
                  <div className="text-xl font-bold text-gray-900 capitalize">
                    {userData?.name}
                  </div>
                  <div className="text-sm text-gray-600">{userData?.email}</div>
                </div>
              </div>
              <div className="text-sm text-gray-700">
                <p>Total Blogs: {userData?.posts.length}</p>
                <p>Published: {userData?.posts.filter(post => post.published).length}</p>
                <p>Drafts: {userData?.posts.filter(post => !post.published).length}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

