export const BlogSkeleton = () => {
  return (
    <div role="status" className="animate-pulse">
      <article className="p-6 border-b border-gray-200">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <div className="ml-3">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-3 bg-gray-200 rounded w-32 mt-2"></div>
          </div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="flex items-center mt-4">
          <div className="h-6 bg-gray-200 rounded w-16 mr-2"></div>
          <div className="h-6 bg-gray-200 rounded w-16"></div>
        </div>
      </article>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default BlogSkeleton;
