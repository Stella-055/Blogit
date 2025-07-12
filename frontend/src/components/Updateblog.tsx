import { useState,useEffect } from "react";
import api from "@/Api/Axios";
import { useQuery ,useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Alert,Button } from "@mui/material";
const Updateblog = () => {
    const {id}=useParams()
    
    type Userblog = {
        title: string;
        synopsis: string;
        blogimage: string;
        content: string;
      };
      const [userblog, setUserblog] = useState<Userblog>({
        title: "-",
        synopsis: "-",
        blogimage: "-",
        content: "-",
      });
      const [errors, setErrors] = useState<null | string>();
      const [isLoading, setIsloading] = useState(false);
   const [newimage, setImage] = useState<File | null>();
      const { data } = useQuery({
        queryKey: ["get-blog-details"],
        queryFn: async () => {
          const response = await api.get(`/api/blogs/${id}`);
    
          return response.data;
        },
      });
    
      const { isPending, mutate  } = useMutation({
        mutationKey: ["update"],
        mutationFn: async (details: Userblog) => {
         ;
          const result = await api.patch(`/api/blogs/${id}`, details);
          return result.data;
        },
    
        onError: (error) => {
          console.log(error);
          if (axios.isAxiosError(error)) {
            setErrors(error.response?.data.message);
            return;
          } else {
            setErrors("something went wrong");
            return;
          }
        },
        onSuccess: () => {
          toast("updated your profile successfully");
        },
      });
      async function imageupload() {
 const uploadUrl = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;
          const formData = new FormData();
          formData.append("file", newimage!);
          formData.append(
            "upload_preset",
            import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
          );
      
          try {
            setIsloading(true);
            const response = await axios.post(uploadUrl, formData);
            setIsloading(false)
            return response.data.secure_url;
          } catch (error) {
            setIsloading(false);
            if (axios.isAxiosError(error)) {
              
              setErrors(error.response?.data.message);
              return;
            } else {
              setErrors("something went wrong during image upload");
              return;
            }
          }
        }
    
      async function updatedetails() {
        setErrors("");
        if (!newimage) {
          const blogToSubmit = {
            ...userblog,
            blogimage: userblog.blogimage,
          };
    
          mutate(blogToSubmit);
        }else{
          const uploadedUrl = await imageupload();
    if (!uploadedUrl) return setErrors("error uploading image");

    const blogToSubmit = {
      ...userblog,
      blogimage: uploadedUrl,
    };
 
    mutate(blogToSubmit);
        }
       
      }
    
      useEffect(() => {
        if (data) {
          setUserblog({
            title: data.title,
            synopsis: data.synopsis,
            blogimage: data.blogimage,
            content: data.content,
          });
        }
      }, [data]);
    
  return (
    <div
         
          className=" flex flex-col items-center justify-center p-2 bg-gray-50  "
        >
          <form className=" w-3/4 flex flex-col items-center justify-center">
            <h2 className="text-4xl text-gray-900 font-medium">BlogIt</h2>
            <p className="text-sm text-gray-500/90 mt-3">
         Edit your blog with just few clicks
            </p>
     <div className="flex gap-2 flex-wrap justify-center">
            <div className="w-96  ">
            {errors && <Alert severity="error">{errors}</Alert>}
                   <ToastContainer position="top-center" />
              <div className="flex items-center w-full bg-transparent border border-gray-300 h-12 rounded-lg overflow-hidden pl-6 gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Blog Title"
                  value={userblog.title}
                  onChange={(e) => {
                    setUserblog({ ...userblog, title: e.target.value });
                  }}
                  className="bg-transparent text-gray-700 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                />
              </div>
              <div className="flex items-center w-full bg-transparent border border-gray-300 h-12 rounded-lg  overflow-hidden pl-6 gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Synopsis"
                  value={userblog.synopsis}
                  onChange={(e) => {
                    setUserblog({ ...userblog, synopsis: e.target.value });
                  }}
                  className="bg-transparent text-gray-700 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                />
              </div>
    
              <div className="flex flex-col items-start w-full bg-transparent border border-gray-300 h-80  rounded-lg  overflow-hidden pl-6 pr-6 gap-2 mt-2">
                <label htmlFor="synopsis" className="text-gray-400 text-sm">
                image for the blog
                </label>
              <img src={userblog.blogimage} alt="image"  /> 
                <input
                  type="file"
                  accept="image/*"
                  id="Synopsis"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
    
                    if (file) setImage(file);
                  }}
                  className="bg-transparent flex items-center justify-center text-gray-700 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                />
              </div>
    
              
            </div>
            <div>
            <textarea
                rows={10}
                id="msg"
                className="w-full border mt-2 p-2  resize-none border-gray-300 outline-none rounded-lg text-sm bg-transparent"
                placeholder="Your Blog Content"
                value={userblog.content}
                onChange={(e) => {
                  setUserblog({ ...userblog, content: e.target.value });
                }}
              ></textarea>
            <Button
              variant="contained"
              fullWidth
              sx={{ borderRadius: "10px", marginTop: "1rem" }}
              loading={isPending||isLoading}
             onClick={updatedetails}
            >
              {" "}
            Update Blog Post
            </Button></div></div>
          </form>
        </div>
  )
}

export default Updateblog
