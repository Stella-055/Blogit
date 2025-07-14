import { Alert } from "@mui/material"
import { useState } from 'react';
import {Button} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import api from "@/Api/Axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const Updatepass = () => {
    const navigate=useNavigate()
    const {id}=useParams()
    type userpas={
        password:string
    }
    const[pas,setPas]=useState<userpas>({password:""})
    const [confirmpas ,setConfirmpas]=useState("")
    const [errors, setErrors] = useState<null | string>();
    const { isPending, mutate } = useMutation({
        mutationKey: ["signup"],
        mutationFn: async (pas: userpas) => {
          const result = await api.post(`/api/user/updatepassword/${id}`, pas);
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
         
          navigate(`/signin`)
         
        },
      });
      function verifyemail() {
        if(!(confirmpas==pas.password)){
            setErrors("password and confirm password do not match")
            return
        }
        mutate(pas);
      }
  return (
    <div className="flex justify-center items-center h-screen ">
        <div>
        <div className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded shadow-[0px_0px_10px_0px] shadow-black/10">
          {errors && <Alert severity="error">{errors}</Alert>}
         
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Update password
          </h2>
          
          <input
           
            className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPas({ password: e.target.value })}
            value={pas.password}
          />
           <input
          required
            className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
            type="password"
            placeholder="Confirm password"
            onChange={(e) => setConfirmpas( e.target.value )}
            value={confirmpas}
          />
          <Button
            variant="contained"
            loading={isPending}
            onClick={verifyemail}
            fullWidth
            sx={{ mt: "1rem" }}
          >
        Update 
          </Button>
          
        </div>  
        </div>
      
    </div>
  )
}

export default Updatepass
