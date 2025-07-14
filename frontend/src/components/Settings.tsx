import { Alert, Button } from "@mui/material";
import Profilenav from "./Profilenav";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import api from "@/Api/Axios";
import { ToastContainer, toast } from "react-toastify";
const Settings = () => {
  type passdetails = {
    prevpas: string;
    password: string;
  };
  const [confirmpass, setConfirmpass] = useState("");
  const [error, setError] = useState<null | string>();
  const [visibility1, setVisibility1] = useState(false);
  const [visibility2, setVisibility2] = useState(false);
  const [visibility3, setVisibility3] = useState(false);
  const [passworddata, setPassworddata] = useState<passdetails>({
    prevpas: "",
    password: "",
  });
  const { isPending, mutate } = useMutation({
    mutationKey: ["change-password"],
    mutationFn: async (passwords: passdetails) => {
      const result = await api.patch("api/user/password", passwords);
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
      toast("password updated successfully");
      setPassworddata({ prevpas: "", password: "" });
      setConfirmpass("");
    },
  });
  function submitpassword() {
    if (!(confirmpass == passworddata.password)) {
      setError("password and confirm password dont match");
      return;
    }
    setError("");
    mutate(passworddata);
  }
  return (
    <div className="flex flex-wrap justify-center items-center text-center gap-4  mb-6  "  >
     
      <div className="flex flex-wrap justify-center items-center text-center gap-4  mt-24  " >
      <Profilenav />
      <div>
        <h3>Want to change your password?</h3>
        {error && <Alert severity="error">{error}</Alert>}
        <ToastContainer position="top-center" />
        <div className="flex items-center mt-6 w-full bg-transparent border border-gray-500 h-12 rounded-full overflow-hidden pl-6  pr-6 gap-2">
          <svg
            width="13"
            height="17"
            viewBox="0 0 13 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
              fill="#6B7280"
            />
          </svg>
          <input
            type={visibility1 ? "text" : "password"}
            placeholder=" Previous Password"
            value={passworddata.prevpas}
            className="bg-transparent text-gray-500 placeholder-gray-500/80 outline-none text-sm w-full h-full"
            onChange={(e) => {
              setPassworddata({ ...passworddata, prevpas: e.target.value });
            }}
          />
          {visibility1 ? (
            <FaEye size={20} onClick={() => setVisibility1(!visibility1)} />
          ) : (
            <FaEyeSlash
              size={20}
              onClick={() => setVisibility1(!visibility1)}
            />
          )}
        </div>
        <div className="flex items-center mt-6 w-full bg-transparent border border-gray-500 h-12 rounded-full overflow-hidden pl-6  pr-6 gap-2">
          <svg
            width="13"
            height="17"
            viewBox="0 0 13 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
              fill="#6B7280"
            />
          </svg>
          <input
            type={visibility2 ? "text" : "password"}
            placeholder="New Password"
            value={passworddata.password}
            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
            onChange={(e) => {
              setPassworddata({ ...passworddata, password: e.target.value });
            }}
          />

          {visibility2 ? (
            <FaEye size={20} onClick={() => setVisibility2(!visibility2)} />
          ) : (
            <FaEyeSlash
              size={20}
              onClick={() => setVisibility2(!visibility2)}
            />
          )}
        </div>
        <div className="flex items-center mt-6 w-full bg-transparent border border-gray-500 h-12 rounded-full overflow-hidden pl-6  pr-6 gap-2">
          <svg
            width="13"
            height="17"
            viewBox="0 0 13 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
              fill="#6B7280"
            />
          </svg>
          <input
            type={visibility3 ? "text" : "password"}
            placeholder=" confirm Password"
            value={confirmpass}
            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
            onChange={(e) => {
              setConfirmpass(e.target.value);
            }}
          />

          {visibility3 ? (
            <FaEye size={20} onClick={() => setVisibility3(!visibility3)} />
          ) : (
            <FaEyeSlash
              size={20}
              onClick={() => setVisibility3(!visibility3)}
            />
          )}
        </div>
        <Button
          variant="contained"
          sx={{ mt: "1rem" }}
          loading={isPending}
          onClick={submitpassword}
          fullWidth
        >
          Update password
        </Button>
      </div>
    </div></div>
  );
};

export default Settings;
