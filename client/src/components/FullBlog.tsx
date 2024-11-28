import { Link } from "react-router-dom";
import { Blog } from "../hooks";
// Correct import for a named export
import { Avatar } from './Avatar';
import ShareBtn from "./ShareBtn";
import Preview from "./Preview";

export const FullBlog = ({ blog }: { blog: Blog }) => {
    // Safeguard for `postedOn`
    const postedOn = blog.postedOn
        ? blog.postedOn.substring(0, blog.postedOn.indexOf(","))
        : "Unknown date";

    // Safeguard for `blog.content` length calculation
    const readTime = blog.content
        ? Math.ceil(blog.content.length / 500) > 1
            ? Math.ceil(blog.content.length / 500) + " minutes read"
            : "1 minute read"
        : "Unknown read time";

    return (
        <div className="flex justify-center pt-16">
            <div className="justify-center p-3 md:w-3/4 lg:w-2/3">
                <div className="pb-3 font-serif text-5xl font-extrabold ">
                    {blog.title}
                </div>
                <div className="flex justify-between ">
                    <div>
                        <div className="flex items-center gap-3">
                            <Link
                                to={"/user/" + blog.authorId}
                                className="flex items-center gap-3 "
                            >
                                <Avatar name={blog.author.name} />
                                <div className="text-lg font-semibold first-letter:uppercase">
                                    {blog.author.name}
                                </div>
                            </Link>
                            <div className="text-slate-400">&#x2022;</div>
                            <div className="flex gap-2 text-slate-500">
                                <div>Published on</div>
                                <div>{postedOn}</div>

                                <div className="text-slate-400">&#x2022;</div>
                                <div className="font-normal text-slate-500">
                                    {readTime}
                                </div>
                            </div>
                        </div>
                    </div>
                    <ShareBtn link={window.location.href}></ShareBtn>
                </div>
                <div className="p-3 border-b"></div>
                <div className="font-serif text-xl prose scale-x-90 scale-y-95 text-slate-800">
                    <Preview text={blog.content} />
                </div>
            </div>
        </div>
    );
};
