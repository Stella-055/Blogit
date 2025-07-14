import Avatar from "@mui/material/Avatar";
import useUser from "@/stores/userStore";
import { useQuery } from "@tanstack/react-query";
import api from "@/Api/Axios";
import dayjs from "dayjs";
import { Alert, Button } from "@mui/material";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import Divider from "@mui/material/Divider";
const Posts = () => {
  const { user } = useUser();

  type userblog = {
    id: string;
    title: string;
    synopsis: string;
    blogimage: string;
    content: string;
    authorId: string;
    authorname: string;
    createdAt: string;
    lastUpdated: string;
    isDeleted: boolean;
  };
  const [searchvalue, setSearchvalue] = useState("");
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-user-posts"],
    queryFn: async () => {
      const response = await api.get("/api/blogs");

      return response.data;
    },
  });
  const filteredBlogs =
    searchvalue.trim() !== ""
      ? data?.filter(
          (blog: userblog) =>
            blog.title.toLowerCase().includes(searchvalue.toLowerCase()) ||
            blog.synopsis.toLowerCase().includes(searchvalue.toLowerCase()),
        )
      : data?.slice(0, 3);
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <img src="/Loading_2.gif" alt="Loading..." />
      </div>
    );
  }
  if (error) {
    return (
      <div className="w-full flex justify-center items-center ">
        <img src="/smtwrong.gif" alt="something went wrong..." />
      </div>
    );
  }
  if (data.length <= 0) {
    return (
      <div className="w-full flex justify-center items-center flex-col mt-2">
        <Alert severity="info"> No Blogs Yet</Alert>
        <img src="/nothing.jpg" alt="" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center  pt-10 mt-10">
      <h1 className="text-gray-900 text-center font-semibold text-3xl sm:text-4xl md:text-5xl max-w-2xl leading-tight">
        Find the best blogs
        <span className="text-blue-500">with Blogit</span>
      </h1>
      <div className="flex items-center border pl-4 gap-2 bg-white border-gray-500/30 h-12 rounded-full overflow-hidden max-w-md w-full m-4 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="#6B7280"
        >
          <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
        </svg>
        <input
          type="text"
          className="w-full h-full outline-none text-sm text-gray-500"
          placeholder="search for a blog "
          value={searchvalue}
          onChange={(e) => setSearchvalue(e.target.value)}
        />
      </div>

      <div className="flex justify-center items-center gap-2 w-full h-full flex-wrap">
        {filteredBlogs && filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog: userblog) => (
            <div
              key={blog.id}
              className="relative w-80 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <img
                className="rounded-t-lg w-96 h-56 object-cover object-top"
                src={blog.blogimage}
                alt=""
              />

              <div className="p-5">
                <h5
                  style={{ textTransform: "capitalize" }}
                  className="mb-2 text-2xl font-bold tracking-tight text-gray-900"
                >
                  {blog.title}
                </h5>

                <p className="mb-3 font-mal text-gray-700">
                  {blog.synopsis.slice(0, 25)}...
                </p>

                <div className="flex items-center mb-2 gap-3 justify-start text-center">
                  {" "}
                  <Avatar
                    alt={blog.authorname}
                    src="/static/images/avataddr/1.jpg"
                  />{" "}
                  <h3 className="text-gray-500">{blog.authorname}</h3>
                  <Divider
                    orientation="vertical"
                    variant="middle"
                    sx={{ border: ".5px solid gray", height: "1rem" }}
                  />
                  <h3 className="text-gray-500">
                    {dayjs(data.createdAt).format("DD MMMM YYYY")}
                  </h3>
                </div>

                <Button
                  variant="contained"
                  size="small"
                  href={`/dashboard/${user!.id}/blogdetails/${blog.id}`}
                  endIcon={<ArrowRight />}
                >
                  Read More
                </Button>
              </div>
            </div>
          ))
        ) : (
          <Alert severity="info">No blogs found for your search</Alert>
        )}
      </div>
    </div>
  );
};
export default Posts;
