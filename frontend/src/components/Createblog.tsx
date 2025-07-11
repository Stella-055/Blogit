import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

import  Alert  from '@mui/material/Alert';
import { useMutation } from "@tanstack/react-query";
import api from "@/Api/Axios";

const Createblog = () => {

type createblogdata={
  title:string
  synopsis:string
  blogimage:string
  content:string
}
const [blogdata, setBlogdata]=useState({
  title:"",
  synopsis:"",
  blogimage:"",
  content:""
})
const [loading , setLoading]=useState(false)
const [error ,setError]=useState<null|string>()
const[info,setInfo]=useState<null|string>()
const [image,setImage]=useState<File | null>()
  async function imageupload(){
    if (!image) {
      setError("No image selected")
      return;
    }
  
const formData= new FormData()
formData.append("file",image)
formData.append("upload_preset","blogit")


try {
  setLoading(true)
  const imageurl=await axios.post(process.env.CLOUDINARY_API!,formData)
  setBlogdata({...blogdata,blogimage:imageurl.data.secure_url})
  setLoading(false)
} catch (error) {
  setLoading(false)
  if (axios.isAxiosError(error)) {
          console.log(error);
          setError(error.response?.data.message);
          return;
        } else {
          setError("something went wrong during image upload");
          return;
        }

}
 

  }
  const { isPending, mutate } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (blog: createblogdata) => {

      const result = await api.post("/user/blogs", blog);
      return result.data;
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
      setError(error.response?.data.message);
        return;
      } else {
        setError("something went wrong");
        return;
      }
    },
    onSuccess: () => {
     setInfo("blog created successfully")
    },
  });

  async function createblog(){
    await imageupload()
    mutate(blogdata)

  }
  
  return (
    <div style={{height:"90vh"}} className=" flex flex-col items-center justify-center p-2 bg-gray-50  ">
      <form className="md:w-96 w-80 flex flex-col items-center justify-center">
        <h2 className="text-4xl text-gray-900 font-medium">BlogIt</h2>
        <p className="text-sm text-gray-500/90 mt-3">
          Welcome To BlogIt!Create your blog today
        </p>

        <div className="w-full ">
           {error && <Alert severity="error">{error}</Alert> }
           {info && <Alert severity="success">{info}</Alert> }
          <div className="flex items-center w-full bg-transparent border border-gray-300 h-12 rounded-lg overflow-hidden pl-6 gap-2 mt-2">
            <input
              type="text"
              placeholder="Blog Title"
              value={blogdata.title}
              onChange={(e)=>{setBlogdata({...blogdata,title:e.target.value})}}
              className="bg-transparent text-gray-700 placeholder-gray-500/80 outline-none text-sm w-full h-full"
            />
          </div>
          <div className="flex items-center w-full bg-transparent border border-gray-300 h-12 rounded-lg  overflow-hidden pl-6 gap-2 mt-2">
            <input
              type="text"
              placeholder="Synopsis"
              value={blogdata.synopsis}
              onChange={(e)=>{setBlogdata({...blogdata,synopsis:e.target.value})}}
              className="bg-transparent text-gray-700 placeholder-gray-500/80 outline-none text-sm w-full h-full"
            />
          </div>

          <div className="flex flex-col items-start w-full bg-transparent border border-gray-300 h-16  rounded-lg  overflow-hidden pl-6 gap-2 mt-2">
            <label htmlFor="synopsis" className="text-gray-400 text-sm">Upload image for the blog</label>
            <input
              type="file"
              accept="image/*"
              id="Synopsis"
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=> {const file = e.target.files?.[0];
            
                if (file) setImage(file);
              }}
              className="bg-transparent flex items-center justify-center text-gray-700 placeholder-gray-500/80 outline-none text-sm w-full h-full"
            />
          </div>
          
          <textarea rows={10}  id="msg" className="w-full border mt-2 p-2  resize-none border-gray-300 outline-none rounded-lg text-sm bg-transparent" placeholder="Your Blog Content" 
             value={blogdata.content}
             onChange={(e)=>{setBlogdata({...blogdata,content:e.target.value})}}></textarea>
         

          
        </div>

        <Button
          variant="contained"
          fullWidth
          sx={{ borderRadius: "10px", marginTop: "1rem" }}
          loading={loading || isPending}
          onClick={createblog}
        >
          {" "}
          Create Blog Post
        </Button>
        
      </form>
    </div>
  );
};

export default Createblog;
