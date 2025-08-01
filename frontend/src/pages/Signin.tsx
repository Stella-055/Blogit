import { Button } from "@mui/material";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Alert from "@mui/material/Alert";
import { useMutation } from "@tanstack/react-query";
import api from "../Api/Axios";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useUser from "../stores/userStore";
const Signin = () => {
  const { setUserName } = useUser();
  type formdata = {
    useremail: string;
    password: string;
  };

  const [formData, setFormData] = useState<formdata>({
    useremail: "",
    password: "",
  });
  const [formError, setFormError] = useState<null | String>();
  const [pswdvisibility, setPswdVisibility] = useState(false);
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (user: formdata) => {
      const result = await api.post("/api/auth/login", user);
      return result.data;
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setFormError(error.response?.data.message);
        return;
      } else {
        setFormError("something went wrong");
        return;
      }
    },
    onSuccess: (data) => {
      setUserName({ username: data.username, id: data.id });
      navigate(`/dashboard/${data.id}/Blogs`);
    },
  });

  function submitform() {
    mutate(formData);
  }

  return (
    <div className="flex h-screen justify-center items-center flex-wrap ">
      <img className="w-96 hidden sm:flex" src="/ww.jpg" alt="leftSideImage" />

      <div className=" flex flex-col items-center justify-center p-2 ">
        <form className="md:w-96 w-80 flex flex-col items-center justify-center">
          <h2 className="text-4xl text-gray-900 font-medium">Sign in</h2>
          <p className="text-sm text-gray-500/90 mt-3">
            Welcome back! Please sign in to continue
          </p>

          <div className="flex items-center gap-2 w-full my-5 justify-center">
            <img src="/logoipsum-295.png" alt="logo" className="w-9" />
            <h3 className="text-blue-500 font-bold">BlogIt</h3>
          </div>
          {formError && <Alert severity="error">{formError}</Alert>}
          <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                fill="#6B7280"
              />
            </svg>
            <input
              type="email"
              placeholder="Email id"
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              onChange={(e) => {
                setFormData({ ...formData, useremail: e.target.value });
              }}
            />
          </div>

          <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6  pr-6 gap-2">
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
              type={pswdvisibility ? "text" : "password"}
              placeholder="Password"
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
            />

            {pswdvisibility ? (
              <FaEye
                size={20}
                onClick={() => setPswdVisibility(!pswdvisibility)}
              />
            ) : (
              <FaEyeSlash
                size={20}
                onClick={() => setPswdVisibility(!pswdvisibility)}
              />
            )}
          </div>

          <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
            <div className="flex items-center gap-2">
              <input className="h-5" type="checkbox" id="checkbox" />
              <label className="text-sm">Remember me</label>
            </div>
            <a className="text-sm underline" href="/forgot/password">
              Forgot password?
            </a>
          </div>

          <Button
            variant="contained"
            fullWidth
            sx={{ borderRadius: "10px", marginTop: "1rem" }}
            onClick={submitform}
            loading={isPending}
          >
            {" "}
            Sign in
          </Button>
          <p className="text-gray-500/90 text-sm mt-4">
            Don’t have an account?{" "}
            <a className="text-indigo-400 hover:underline" href="/Signup">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
