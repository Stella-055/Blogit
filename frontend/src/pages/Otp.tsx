import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import api from "@/Api/Axios";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Alert} from "@mui/material";
import { useParams } from "react-router-dom";
   
const Otp = () => {
  const navigate=useNavigate()
  type userotp={
    otp:string
  }
  const {id}=useParams()
  const [value, setValue] = useState <userotp>({otp:""});
  const [errors, setErrors] = useState<null | string>();
  const { isPending, mutate } = useMutation({
    mutationKey: ["OTP"],
    mutationFn: async (otp:userotp) => {
      const result = await api.post(`/api/user/forgotpassword/${id}`, otp);
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
     
      navigate(`/update/password/${id}`)
     
    },
  });

  function submitotp(){
    mutate(value)
  }
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="border p-14">
        <div className="space-y-2">
              {errors && <Alert severity="error">{errors}</Alert>}
          <h2 className="text-lg">One-Time Password</h2>
          <InputOTP
            maxLength={6}
            value={value.otp}
            onChange={(otp) => setValue({ otp })}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <h2 className="text-base">
            {" "}
            Please enter the one-time password sent to your phone.{" "}
          </h2>
          <Button onClick={submitotp} loading={isPending} variant="contained"> Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default Otp;
