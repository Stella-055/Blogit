import { Alert, Button } from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/Api/Axios";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
const Profiledetails = () => {
  type UserProfile = {
    username: string;
    useremail: string;
    firstname: string;
    lastname: string;
  };
  const [userprofile, setUserprofile] = useState<UserProfile>({
    username: "-",
    useremail: "-",
    firstname: "-",
    lastname: "-",
  });
  const [error, setError] = useState<null | string>();

  const { data } = useQuery({
    queryKey: ["get-user-details"],
    queryFn: async () => {
      const response = await api.get("/api/user/");

      return response.data;
    },
  });

  const { isPending, mutate } = useMutation({
    mutationKey: ["update"],
    mutationFn: async (details: UserProfile) => {
      console.log(details);
      const result = await api.patch("/api/user", details);
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
      toast.success("updated your profile successfully");
    },
  });

  function updatedetails() {
    setError("");
    mutate(userprofile);
  }

  useEffect(() => {
    if (data) {
      setUserprofile({
        username: data.username,
        useremail: data.useremail,
        firstname: data.firstname,
        lastname: data.lastname,
      });
    }
  }, [data]);

  return (
    <form className="flex flex-col items-center text-sm text-slate-800 ">
      <p className="text-xs bg-blue-200 text-blue-600 font-medium px-3 py-2 rounded-full my-2">
        Your Details
      </p>

      <div className="max-w-96 w-full px-4">
        {error && <Alert severity="error">{error}</Alert>}
        <ToastContainer position="top-center" />
        <label htmlFor="username" className="font-medium mt-4  text-gray-500">
          User Name
        </label>
        <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-gray-400 rounded-full focus-within:ring-2 focus-within:ring-gray-400 transition-all overflow-hidden">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5 3.438h-15a.937.937 0 0 0-.937.937V15a1.563 1.563 0 0 0 1.562 1.563h13.75A1.563 1.563 0 0 0 18.438 15V4.375a.94.94 0 0 0-.938-.937m-2.41 1.874L10 9.979 4.91 5.313zM3.438 14.688v-8.18l5.928 5.434a.937.937 0 0 0 1.268 0l5.929-5.435v8.182z"
              fill="#475569"
            />
          </svg>
          <input
            id="username"
            type="email"
            onChange={(e) => {
              setUserprofile({ ...userprofile, username: e.target.value });
            }}
            className="h-full  text-gray-500 px-2 w-full outline-none bg-transparent"
            value={userprofile.username}
          />
        </div>
        <label htmlFor="name" className="font-medium text-gray-500">
          First Name
        </label>
        <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-gray-400 rounded-full focus-within:ring-2 focus-within:ring-gray-400 transition-all overflow-hidden">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.311 16.406a9.64 9.64 0 0 0-4.748-4.158 5.938 5.938 0 1 0-7.125 0 9.64 9.64 0 0 0-4.749 4.158.937.937 0 1 0 1.623.938c1.416-2.447 3.916-3.906 6.688-3.906 2.773 0 5.273 1.46 6.689 3.906a.938.938 0 0 0 1.622-.938M5.938 7.5a4.063 4.063 0 1 1 8.125 0 4.063 4.063 0 0 1-8.125 0"
              fill="#475569"
            />
          </svg>
          <input
            type="text"
            id="name"
            onChange={(e) => {
              setUserprofile({ ...userprofile, firstname: e.target.value });
            }}
            className="h-full px-2 w-full outline-none bg-transparent text-gray-500"
            value={userprofile.firstname}
          />
        </div>

        <label htmlFor="lastname" className="font-medium mt-4 text-gray-500">
          Last Name
        </label>
        <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-gray-400 rounded-full focus-within:ring-2 focus-within:ring-gray-400 transition-all overflow-hidden">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.311 16.406a9.64 9.64 0 0 0-4.748-4.158 5.938 5.938 0 1 0-7.125 0 9.64 9.64 0 0 0-4.749 4.158.937.937 0 1 0 1.623.938c1.416-2.447 3.916-3.906 6.688-3.906 2.773 0 5.273 1.46 6.689 3.906a.938.938 0 0 0 1.622-.938M5.938 7.5a4.063 4.063 0 1 1 8.125 0 4.063 4.063 0 0 1-8.125 0"
              fill="#475569"
            />
          </svg>
          <input
            id="lastname"
            type="email"
            onChange={(e) => {
              setUserprofile({ ...userprofile, lastname: e.target.value });
            }}
            className="h-full text-gray-500 px-2 w-full outline-none bg-transparent"
            value={userprofile.lastname}
          />
        </div>
        <label htmlFor="email" className="font-medium mt-4  text-gray-500">
          Email
        </label>
        <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-gray-400 rounded-full focus-within:ring-2 focus-within:ring-gray-400 transition-all overflow-hidden">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5 3.438h-15a.937.937 0 0 0-.937.937V15a1.563 1.563 0 0 0 1.562 1.563h13.75A1.563 1.563 0 0 0 18.438 15V4.375a.94.94 0 0 0-.938-.937m-2.41 1.874L10 9.979 4.91 5.313zM3.438 14.688v-8.18l5.928 5.434a.937.937 0 0 0 1.268 0l5.929-5.435v8.182z"
              fill="#475569"
            />
          </svg>
          <input
            id="email"
            type="email"
            onChange={(e) => {
              setUserprofile({ ...userprofile, useremail: e.target.value });
            }}
            className="h-full  text-gray-500 px-2 w-full outline-none bg-transparent"
            value={userprofile.useremail}
          />
        </div>

        <Button
          variant="contained"
          fullWidth
          sx={{ borderRadius: "10px", marginTop: "1rem" }}
          onClick={updatedetails}
          loading={isPending}
        >
          {" "}
          Update
        </Button>
      </div>
    </form>
  );
};

export default Profiledetails;
