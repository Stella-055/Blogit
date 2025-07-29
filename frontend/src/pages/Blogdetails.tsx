import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "@mui/material";
import api from "@/Api/Axios";
import { IoIosArrowDown } from "react-icons/io";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { PiHandsClappingFill } from "react-icons/pi";
import { LuMessageCircle } from "react-icons/lu";
import { CiBookmark } from "react-icons/ci";
import { IoPlayCircleOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import { IoIosMore } from "react-icons/io";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PiHandsClappingBold } from "react-icons/pi";
const Blogdetails = () => {
  const { id } = useParams();
  const [clapped, setClapped] = useState(false);
  const [claps, setClaps] = useState(10);
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-post-details"],
    queryFn: async () => {
      const response = await api.get(`/api/blogs/${id}`);

      return response.data;
    },
  });

  return (
    <>
      {error && (
        <div className="w-full flex justify-center items-center">
          <img src="/500.jpg" alt="" />
        </div>
      )}
      {isLoading && (
        <div className="w-full flex justify-center items-center ">
          <img src="/Loading_2.gif" alt="" />{" "}
        </div>
      )}
      {data && (
        <div className="flex justify-center flex-col items-center pt-4 ">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-5xl mb-3 mt-24 sm:w-2/4  w-80">
            {data.title.toUpperCase()}
          </h1>
          <div className="flex gap-4  items-center flex-wrap sm:justify-start justify-center ">
            <Avatar
              alt={data.authorname}
              src="/static/g"
              sx={{ width: 35, height: 35 }}
            />
            <h3>{data.authorname}</h3>
            <Button
              variant="outlined"
              sx={{
                borderRadius: "2rem",
                height: "1.8rem ",
                color: "gray",
                textTransform: "capitalize",
                borderColor: "black",
              }}
              endIcon={<IoIosArrowDown />}
            >
              following
            </Button>
            <div className="flex gap-4">
              <h3 className="text-sm text-gray-500">16 mins Read</h3>
              <h3 className="text-sm text-gray-500">
                {" "}
                {dayjs(data.createdAt).format("DD MMMM YYYY")}
              </h3>
            </div>
          </div>
          <hr className="sm:w-2/4 w-80 bg-gray-500 h-0.3 mt-2 mb-4" />
          <div className="flex justify-between sm:w-2/4 w-80">
            <div className="flex gap-2 items-center ">
              {clapped ? (
                <PiHandsClappingFill
                  size={23}
                  color="gray"
                  onClick={() => {
                    setClapped(!clapped);
                    setClaps(claps - 1);
                  }}
                />
              ) : (
                <PiHandsClappingBold
                  size={23}
                  color="gray"
                  onClick={() => {
                    setClapped(!clapped);
                    setClaps(claps + 1);
                  }}
                />
              )}
              <h3 className="text-sm text-gray-500">{claps}</h3>
              <LuMessageCircle size={23} color="gray" />
              <h3 className="text-sm text-gray-500">211</h3>
            </div>
            <div className="flex gap-3">
              <CiBookmark size={23} color="gray" />
              <IoPlayCircleOutline size={23} color="gray" />
              <FiUpload size={23} color="gray" />
              <IoIosMore size={23} color="gray" />
            </div>
          </div>
          <hr className="sm:w-2/4 w-80 bg-gray-500 h-0.3 mt-4 mb-3" />
          <div className=" h-96  overflow-hidden">
            {" "}
            <img src={data.blogimage} alt="" className=" h-full w-full " />
          </div>

          <div className="prose prose-lg mb-4  sm:w-2/4 w-80">
            <ReactMarkdown remarkPlugins={[remarkGfm]}
               components={{
                  h1: ({ ...props }) => (
                    <h1 className="text-3xl font-bold mb-4" {...props} />
                  ),
                  h2: ({ ...props }) => (
                    <h2 className="text-2xl font-semibold mt-6 mb-2" {...props} />
                  ),
                  p: ({ ...props }) => (
                    <p className="text-base text-gray-700 mb-4" {...props} />
                  ),
                  ul: ({ ...props }) => (
                    <ul className="list-disc pl-6 mb-4" {...props} />
                  ),
                  li: ({ ...props }) => <li className="mb-1" {...props} />,
                  a: ({ ...props }) => (
                    <a
                      className="text-blue-500 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    />
                  ),
                  code: ({ ...props }) => (
                    <code className="bg-gray-100 px-1 rounded" {...props} />
                  ),
                }}>
              {data.content}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </>
  );
};

export default Blogdetails;
