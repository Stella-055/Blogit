import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@mui/material";

import { useState } from "react";
const Otp = () => {
  const [value, setValue] = useState("");
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="border p-14">
        <div className="space-y-2">
          <h2 className="text-lg">One-Time Password</h2>
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
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
          <Button variant="contained"> Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default Otp;
