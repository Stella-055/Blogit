import Button from "@mui/material/Button";
import useUser from "../stores/userStore";
import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const { user } = useUser();
  return (
    <div className="p-5 flex justify-between items-center border shadow-sm">
      <div className="flex items-center">
        <img src="/logoipsum-295.png" alt="logo" className="w-9" />
        <h1 className="text-blue-500 font-bold text-2xl">BlogIt</h1>
      </div>
      {user ? (
        <div className="flex items-center gap-2">
          <div className=" flex gap-2">
            <NavLink
              to="/dashboard/Blogs"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-300 p-1 rounded"
                  : "bg-white transition-all hover:bg-gray-300 p-1 rounded"
              }
            >
              Blogs
            </NavLink>
            <NavLink
              to="/dashboard/Createblog"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-300 p-1 rounded "
                  : "bg-white transition-all hover:bg-gray-300 p-1 rounded"
              }
            >
              Create Blog
            </NavLink>
            <NavLink
              to="/dashboard/Profile"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-300 p-1 rounded"
                  : "bg-white transition-all hover:bg-gray-300 p-1 rounded"
              }
            >
              Profile
            </NavLink>
          </div>
          {user && (
            <h2 className="text-gray-500 text-base ml-4">
              {" "}
              😀 Welcome {user.username}
            </h2>
          )}
          <Avatar>{user.username.slice(0, 1)}</Avatar>{" "}
        </div>
      ) : (
        <Button
          variant="contained"
          size="medium"
          href="/Signin"
          sx={{ backgroundColor: "black", color: "white" }}
        >
          SIGN IN
        </Button>
      )}
    </div>
  );
};

export default Nav;
