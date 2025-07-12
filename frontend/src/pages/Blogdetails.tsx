import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "@mui/material";
import api from "@/Api/Axios";
import { IoIosArrowDown } from "react-icons/io";
import {Button} from "@mui/material";
import dayjs from "dayjs"
import { useState } from "react";
import Rating from '@mui/material/Rating';
import { LuMessageCircle } from "react-icons/lu";
import { CiBookmark } from "react-icons/ci";
import { IoPlayCircleOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import { IoIosMore } from "react-icons/io";
const Blogdetails = () => {
  const { id } = useParams();
  const [value, setValue] = useState<number | null>(2);
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
        <div className="flex justify-center flex-col items-center mt-4 ">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-5xl mb-3">
            {data.title.toUpperCase()}
            </h1>
          <div className="flex gap-4 justify-start items-center ">
          <Avatar
  alt={data.username}
  src="/static/g"
  sx={{ width: 35, height: 35 , }}
 
/>
<h3>{data.username}</h3>
<Button variant="outlined"  sx={{borderRadius:"2rem" ,height:'1.8rem ',color:"gray",textTransform:"capitalize", borderColor:"black"}} endIcon={<IoIosArrowDown />}>
 following
</Button>
<h3>16 mins Read</h3>
<h3> {dayjs(data.createdAt).format("DD MMMM YYYY")}</h3>
          </div>
     <hr className="w-2/4 bg-gray-500 h-0.3 mt-2 mb-4"/>
     <div className="flex justify-between w-2/4">
<div className="flex gap-2 items-center">
<Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
<LuMessageCircle size={23} color="gray" />
</div>
<div className="flex gap-3">
<CiBookmark  size={23} color="gray" />
<IoPlayCircleOutline  size={23} color="gray" />
<FiUpload  size={23} color="gray" />
<IoIosMore   size={23} color="gray"/>
</div>

     </div>
     <hr className="w-2/4 bg-gray-500 h-0.3 mt-4 mb-3"/>
     <img src={data.blogimage} alt="" className=" h-96" />
     
        </div>
      )}{" "}
    </>
  );
};

export default Blogdetails;
