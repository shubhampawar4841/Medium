import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import { Logout } from "./Logout";

export const Appbar = ({ write = true }) => {
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link
        to={"/blogs"}
        className="flex flex-col justify-center cursor-pointer text-2xl font-bold"
      >
        Medium
      </Link>

      <div className="flex">
        {write && (
          <Link to={"/publish"}>
            <button
              type="button"
              className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              New Blog
            </button>
          </Link>
        )}
        <Avatar size={"big"} name="Ahmed"/>
        <Logout />
      </div>
    </div>
  );
};

export default Appbar;
