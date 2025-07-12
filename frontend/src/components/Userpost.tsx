
import IconButton from "@mui/material/IconButton";
import { FaEdit } from "react-icons/fa";

import Box from '@mui/material/Box';
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import api from "@/Api/Axios";
import useUser from "@/stores/userStore";
import Modal from '@mui/material/Modal';
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
const Userpost = () => {
  const [open, setOpen] = useState(false);
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
            <MdDeleteForever color="red" size={30} onClick={()=>setOpen(true)}/>
                    </IconButton>
                    <FaEdit className="text-blue-500"  size={25} onClick={()=>{navigate(`/dashboard/${user!.id}/userblogdetails/${blog.id}`)}}/></div>
        </div>
 

          )
          
        }) } </div>


      <Modal
          open={open}
          onClose={()=> setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4}}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure you want to delete this blog?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             This action is parmanent and can not be undone
            </Typography>
            <Box sx={{display:"flex", justifyContent:"center", gap:"1rem"}}>
              <Button variant="contained" color="error">Yes</Button>
              <Button variant="contained">NO</Button>
            </Box>
          </Box>
        </Modal>
    </div>
  );
};

export default Userpost;

