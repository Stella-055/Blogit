import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import IconButton from "@mui/material/IconButton";
import { FaEdit } from "react-icons/fa";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery } from "@tanstack/react-query";
import api from "@/Api/Axios";
import useUser from "@/stores/userStore";

import { useNavigate } from "react-router-dom";
const Userpost = () => {
  const{user}=useUser()
  const navigate = useNavigate();
  type userblog = {
    id: string;
    title: string;
    synopsis: string;
    content: string;
    blogimage: string;
    authorId: string;
    autorname: string;
    createdAt: string;
    lastUpdated: string;
    isDeleted: boolean;
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-user-posts"],
    queryFn: async () => {
      const response = await api.get("/api/user/blogs");

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
        <h3>something went wrong while fetching your blogs</h3>
      </div>
    );
  }
  if (!data || data.length === 0) {
    return <img src="/nothing.jpg" alt="No posts found" />;
  }
  return (
    <div className="mt-4  flex flex-col items-center mb-3">
      <p className="text-xs bg-blue-200 text-blue-600 font-medium px-3 py-2 rounded-full my-2">
        Your Blogs
      </p>
      <div className="flex flex-wrap gap-3 w-full justify-center">
      {data &&
        data.map((blog: userblog) => {
          return (

<div key={blog.id} className="p-4 bg-white rounded-lg shadow-sm max-w-80">
            <img className="rounded-md max-h-40 w-full object-cover" src={blog.blogimage} alt="officeImage" />
            <p className="text-gray-900 text-xl font-semibold ml-2 mt-2">{blog.title}</p>
            <p className="text-gray-500 text-sm my-3 ml-2"> {blog.synopsis}</p>
            <div className="flex justify-start items-center"><IconButton aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                    <FaEdit color="grey" size={25} onClick={()=>{navigate(`/dashboard/${user!.id}/userblogdetails/${blog.id}`)}}/></div>
        </div>


          );
        }) } </div>
    </div>
  );
};

export default Userpost;


           {/* <div
              style={{ width: "30rem" }}
              key={blog.id}
              className="flex border-solid border-gray-500 p-2 border-2 text-gray-500  justify-around"
            >
              {" "}
              <span>{index}</span>
              {blog.title}{" "}
              <div className="gap-2 flex">
                {" "}
                <button>
                  <FaPen size={20} onClick={() => navigate} />
                </button>{" "}
                <Popover>
                  <PopoverTrigger>
                    <IconButton aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </PopoverTrigger>
                  <PopoverContent>
                    {" "}
                    <div className="flex flex-col items-center bg-white shadow-md rounded-xl py-6 px-5 md:w-[460px] w-[370px] border border-gray-300">
                      <div className="flex items-center justify-center p-4 bg-red-100 rounded-full">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.875 5.75h1.917m0 0h15.333m-15.333 0v13.417a1.917 1.917 0 0 0 1.916 1.916h9.584a1.917 1.917 0 0 0 1.916-1.916V5.75m-10.541 0V3.833a1.917 1.917 0 0 1 1.916-1.916h3.834a1.917 1.917 0 0 1 1.916 1.916V5.75m-5.75 4.792v5.75m3.834-5.75v5.75"
                            stroke="#DC2626"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <h2 className="text-gray-900 font-semibold mt-4 text-xl">
                        Are you sure?
                      </h2>
                      <p className="text-sm text-gray-600 mt-2 text-center">
                        Do you really want to continue? This action
                        <br />
                        cannot be undone.
                      </p>
                      <div className="flex items-center justify-center gap-4 mt-5 w-full">
                        <button
                          type="button"
                          className="w-full md:w-36 h-10 rounded-md border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-100 active:scale-95 transition"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="w-full md:w-36 h-10 rounded-md text-white bg-red-600 font-medium text-sm hover:bg-red-700 active:scale-95 transition"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div> */}