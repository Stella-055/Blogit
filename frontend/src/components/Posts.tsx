import Avatar from "@mui/material/Avatar";
import useUser from "@/stores/userStore";
import { useQuery } from "@tanstack/react-query";
import api from "@/Api/Axios";

import { Button } from "@mui/material";
import { ArrowRight } from "lucide-react";
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
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-user-posts"],
    queryFn: async () => {
      const response = await api.get("/api/blogs");

      return response.data;
    },
  });
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center ">
        <img src="/Loading_2.gif" alt="" />{" "}
      </div>
    );
  }
  if (error) {
    return (
      <div className="w-full flex justify-center items-center">
        <img src="/smtwrong.gif" alt="" />
      </div>
    );
  }
  if (data.length<=0) {
    return (
      <div className="w-full flex justify-center items-center">
        <img src="/nothing.jpg" alt="" />
      </div>
    );
  }

  return (

    <div className="flex flex-col items-center  pt-10 bg-gray-50">
        <h1 className="text-gray-900 text-center font-semibold text-3xl sm:text-4xl md:text-5xl max-w-2xl leading-tight">
              Find the best blogs 
                <span className="text-blue-500">
                with Blogit
                </span>
            </h1>
     <div className="flex items-center border pl-4 gap-2 bg-white border-gray-500/30 h-[46px] rounded-full overflow-hidden max-w-md w-full m-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="#6B7280">
                        <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8"/>
                    </svg>
                    <input type="text" className="w-full h-full outline-none text-sm text-gray-500"placeholder="search for a blog " />
                    <button type="submit" className="bg-blue-500 w-32 h-9 rounded-full text-sm text-white mr-[5px]">Search</button>
                </div>
    <div className="flex justify-center items-center gap-2 w-full h-full flex-wrap">
      {data.slice(0,3).map((blog: userblog) => {
        return (
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
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {blog.title}
              </h5>

              <p className="mb-3 font-mal text-gray-700">{blog.synopsis.slice(0,25)}...</p>

              <div className="flex items-center mb-2 gap-1">
                {" "}
                <Avatar
                  alt={blog.authorname}
                  src="/static/images/avatar/1.jpg"
                />{" "}
                <h3>Created By:{blog.authorname}</h3>
                <h3>  {new Date(blog.createdAt).toISOString().split("T")[0]}</h3>
              </div>

              <Button
                variant="contained"
                href={`/dashboard/${user!.id}/blogdetails/${blog.id}`}
                endIcon={<ArrowRight />}
              >
                Read More
              </Button>
            </div>
          </div>
        );
      })}
    </div></div>
  );
};
export default Posts;
