import { useState, useRef } from "react";
import Avatar from '@mui/material/Avatar';
import useUser from "@/stores/userStore";
import { useQuery } from "@tanstack/react-query";
import api from "@/Api/Axios";


const Posts = () => {


 
const {user}=useUser()

  type userblog={
  
    id: string,
        title: string,
        synopsis: string,
        content: string,
        authorId: string,
        createdAt: string
        lastUpdated: string,
        isDeleted:boolean
    
  }
  const {data,isLoading,error} = useQuery({
    queryKey: ["get-user-posts"],
    queryFn: async () => {
      const response = await api.get(
        "/user/blog",
      );
 
      return response.data;
    },
    
  })
  if(isLoading){
    return <img src="/Loading_2.gif" alt="" />
  }
  if(error){
    return <img src="/smtwrong.gif" alt="" />
  }
  if (!data || data.length === 0) {
    return <img src="/nothing.jpg" alt="No posts found" />;
  }
  return (
    <div className="flex justify-center items-center gap-2 w-full h-full" >
      {data.map((blog:userblog,index:number)=>{
      return  (
    <div
    key={index}
     
      className="relative w-80 bg-white border border-gray-200 rounded-lg shadow-sm"
    >
     

      <a href="#">
        <img
          className="rounded-t-lg w-96 h-56 object-cover object-top"
          src="https://images.unsplash.com/photo-1560264418-c4445382edbc?q=80&w=800"
          alt=""
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
           {blog.title}
          </h5>
        </a>
        <p className="mb-3 font-mal text-gray-700">
        {blog.synopsis}
        </p>

        <div className="flex items-center mb-2 gap-2"> <Avatar alt={user?.username}    src="/static/images/avatar/1.jpg" /> <h3 >{user?.username}</h3><h3> {blog.createdAt} </h3></div>
        <a
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div> )
      })}</div>
  );
};
export default Posts;
