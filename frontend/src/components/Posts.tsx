
import Avatar from '@mui/material/Avatar';
import useUser from "@/stores/userStore";
import { useQuery } from "@tanstack/react-query";
import api from "@/Api/Axios";

import { Button } from '@mui/material';
import { ArrowRight } from 'lucide-react';
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
        "/user/blogs",
      );
 
      return response.data;
    },
    
  })
  if(isLoading){
    return <div className='w-full flex justify-center items-center '><img src="/Loading_2.gif" alt="" /> </div>
  }
  if(error){
    return <div className='w-full flex justify-center items-center'><img src="/smtwrong.gif" alt="" /></div>
  }
  if (!data || data.length === 0) {
    return <img src="/nothing.jpg" alt="No posts found" />;
  }
  return (
    <div className="flex justify-center items-center gap-2 w-full h-full" >
      {data.map((blog:userblog)=>{
      return  (
    <div
    key={blog.id}
    
      className="relative w-80 bg-white border border-gray-200 rounded-lg shadow-sm"
    >
     

    
        <img
          className="rounded-t-lg w-96 h-56 object-cover object-top"
          src="https://images.unsplash.com/photo-1560264418-c4445382edbc?q=80&w=800"
          alt=""
        />
     
      <div className="p-5">
  
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
           {blog.title}
          </h5>
        
        <p className="mb-3 font-mal text-gray-700">
        {blog.synopsis}
        </p>

        <div className="flex items-center mb-2 gap-2"> <Avatar alt={user!.username}    src="/static/images/avatar/1.jpg" /> <h3 >{user?.username}</h3><h3> {blog.createdAt} </h3></div>
        
        <Button variant='contained' href={`/dashboard/${user!.id}/blogdetails/${blog.id}`}
        endIcon={<ArrowRight />}>Read More</Button>
        
        
      </div>
    </div> )
      })}</div>
  );
};
export default Posts;
