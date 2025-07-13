
import{ Alert} from "@mui/material";
import Otp from "@/components/Otp"
import { Button } from "@mui/material"
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import api from "@/Api/Axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
const Forgotpas = () => {
    type usremail={
        useremail:string
    }
    const[email ,setEmail]=useState <usremail>({useremail:""})
    const[errors, setErrors]=useState<null|string>()
    const { isPending, mutate } = useMutation({
        mutationKey: ["signup"],
        mutationFn: async (email:usremail) => {
          const result = await api.post("/api/user/forgotpassword", email);
          return result.data;
        },
    
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            setErrors(error.response?.data.message);
            return;
          } else {
            setErrors("something went wrong");
            return;
          }
        },
        onSuccess: () => {
          toast.info("An Otp has been sent to that email")
          return(<Otp/>)
        },
      });
    function verifyemail(){
       
 mutate(email)}
  return (
    <div className="flex justify-center items-center h-screen ">
       
        <div>
       <div className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded shadow-[0px_0px_10px_0px] shadow-black/10">
         {errors && <Alert severity="error">{errors}</Alert>}
                 <ToastContainer position="top-center" />
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Forget Password?</h2>
            <label htmlFor="email">Email</label>
            <input id="email" className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4" type="email" placeholder="Enter your email" onChange={(e)=>setEmail({useremail:e.target.value})} value={email.useremail}/>
<Button variant="contained" loading={isPending} onClick={verifyemail} fullWidth sx={{mt:"1rem"}}>SEND EMAIL</Button>
            <p className="text-center mt-4">Don’t have an account? <span className="text-blue-500 underline"> <a href="/Signup">Signup Now</a></span></p>
        </div>
    </div>
        </div>
   
   
  )
}

export default Forgotpas
