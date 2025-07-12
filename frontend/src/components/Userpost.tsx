import IconButton from "@mui/material/IconButton";
import { FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import api from "@/Api/Axios";
import useUser from "@/stores/userStore";
import Modal from "@mui/material/Modal";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Alert, Button } from "@mui/material";
import { RiseLoader } from "react-spinners";
const Userpost = () => {
  const [open, setOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  const { user } = useUser();
  const navigate = useNavigate();
  type userblog = {
    id: string;
    title: string;
    synopsis: string;
    content: string;
    blogimage: string;
    authorId: string;
    autorname: string;
    createdAt: string;
    lastUpdated: string;
    isDeleted: boolean;
  };

  const handleDelete = async () => {
    setOpen(false);
    if (!selectedBlogId) return toast.error("No blog selected");

    try {
      const response = await api.delete(`/api/blogs/${selectedBlogId}`);

      return toast.success(response.data.message);
    } catch (error) {
      return toast.error("Something went wrong");
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-user-posts"],
    queryFn: async () => {
      const response = await api.get("/api/user/blogs");

      return response.data;
    },
  });
  if (isLoading) {
    return (
      <RiseLoader
        style={{ marginTop: "3rem", marginBottom: "3rem" }}
        color="#3B82F6"
      />
    );
  }
  if (error) {
    return (
      <Alert severity="error" sx={{ marginTop: "2rem", marginBottom: "3rem" }}>
        Something went wrong while fetching your Blogs
      </Alert>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Alert
        severity="info"
        sx={{
          marginTop: "2rem",
          marginBottom: "3rem",
          backgroundColor: "white",
        }}
      >
        Your blogs will show here
      </Alert>
    );
  }

  return (
    <div className="mt-4  flex flex-col items-center mb-3">
      <p className="text-xs bg-blue-200 text-blue-600 font-medium px-3 py-2 rounded-full my-2">
        Your Blogs
      </p>
      <ToastContainer position="top-center" />
      <div className="flex flex-wrap gap-3 w-full justify-center">
        {data &&
          data.map((blog: userblog) => {
            return (
              <div
                key={blog.id}
                className="p-4 bg-white rounded-lg shadow-sm max-w-80"
              >
                <img
                  className="rounded-md max-h-40 w-full object-cover"
                  src={blog.blogimage}
                  alt="officeImage"
                />
                <p className="text-gray-900 text-xl font-semibold ml-2 mt-2">
                  {blog.title}
                </p>
                <p className="text-gray-500 text-sm my-3 ml-2">
                  {" "}
                  {blog.synopsis}
                </p>
                <div className="flex justify-start items-center">
                  <IconButton aria-label="delete">
                    <MdDeleteForever
                      color="red"
                      size={30}
                      onClick={() => {
                        setOpen(true);
                        setSelectedBlogId(blog.id);
                      }}
                    />
                  </IconButton>
                  <FaEdit
                    className="text-blue-500"
                    size={25}
                    onClick={() => {
                      navigate(
                        `/dashboard/${user!.id}/userblogdetails/${blog.id}`,
                      );
                    }}
                  />
                </div>
              </div>
            );
          })}{" "}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm deletion
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this blog? This action is permanent
            and can not be undone
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Yes
            </Button>
            <Button variant="contained" onClick={() => setOpen(false)}>
              NO
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Userpost;
