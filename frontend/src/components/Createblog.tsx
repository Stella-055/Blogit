import { Button } from "@mui/material"
import { useState } from "react"


const Createblog = () => {
    const [image,setImage]=useState("")
  return (
  
    <div className=" flex flex-col items-center justify-center p-2 ">
            <form className="md:w-96 w-80 flex flex-col items-center justify-center">
              <h2 className="text-4xl text-gray-900 font-medium">BlogIt</h2>
              <p className="text-sm text-gray-500/90 mt-3">
                Welcome To BlogIt!Create your blog today
              </p>
    
             
              <div className="w-full ">
               
    
               <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 mt-2">
            
                  <input
                    type="url"
                    placeholder="Image Url"
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                   
                  />
                </div>
                <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 mt-2">
                
                  <input
                    type="text"
                    placeholder="Title"
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                   
                  />
                </div>
                <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 mt-2">
                  
                  <input
                    type="text"
                    placeholder="synopsis"
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                  
                  />
                </div>
    
                <div className="flex items-center mt-4 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 pr-6 gap-2">
                  
                  <input
                   type='text'
                    placeholder="Password"
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                   
                  />
             
                </div>
                
                 
           
             
              </div>
    
              <Button
                variant="contained"
                fullWidth
              
                sx={{ borderRadius: "10px", marginTop: "1rem" }}
              
              >
                {" "}
                Create Account
              </Button>
              <p className="text-gray-500/90 text-sm mt-4">
                Already have an account?{" "}
                <a className="text-indigo-400 hover:underline" href="Signin">
                  Sign In
                </a>
              </p>
            </form>
          </div>
   
  )
}

export default Createblog
