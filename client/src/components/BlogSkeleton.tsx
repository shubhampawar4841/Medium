export const BlogSkeleton = () => {
    return (
      <div role="status" className="animate-pulse">
        <div className="p-4 border-b-[0.01rem] pb-3 border-gray-300 cursor-pointer">
          <div className="flex items-center gap-2 ">
            <div className="h-6 w-6 bg-gray-200 rounded-full mb-3"></div>
  
            <div className=" bg-gray-200 rounded-full w-20 h-5 max-w-[200px] mb-2.5"></div>
  
            <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full   mb-2.5"></div>
          <div className="font-light text-md">
            <div className="h-2 bg-gray-200 rounded-full   mb-2.5"></div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full w-full   mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full w-full mb-2.5"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  };