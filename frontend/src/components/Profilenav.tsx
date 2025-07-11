import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { RiContactsFill } from "react-icons/ri";
import { ChartNoAxesCombined } from "lucide-react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";
import { MdLiveHelp } from "react-icons/md";
import useUser from "@/stores/userStore";
const Profilenav = () => {
  const { user } = useUser();
  return (
    <>
      <div className="flex flex-col  justify-center items-center h-full gap-x-1.5 ">
        <div>
          <Avatar
            alt="Remy Sharp"
            src="/contact.jpg"
            sx={{ width: "8rem", height: "8rem" }}
          />
          <a href="#" className="text-blue-500">
            {" "}
            Upload profile picture
          </a>
        </div>
        <div className=" mt-6 w-48">
          <NavLink
            to={`/dashboard/${user!.id}/Profile`}
            className={({ isActive }) =>
              isActive
                ? "bg-gray-500 text-white rounded flex border-solid border-gray-500  border-2 items-center justify-around p-1  mb-2"
                : "bg-gray-100 border-solid border-gray-500  border-2 text-gray-500 transition-all hover:bg-gray-500 hover:text-white rounded w-full flex  justify-around items-center p-1 mb-2 "
            }
          >
            <RiContactsFill /> Profile
          </NavLink>

          <NavLink
            to={`/dashboard/${user!.id}/settings`}
            className={({ isActive }) =>
              isActive
                ? "bg-gray-500 text-white rounded flex border-solid border-gray-500  border-2 items-center justify-around p-1  mb-2"
                : "bg-gray-100 border-solid border-gray-500  border-2 text-gray-500 transition-all hover:bg-gray-500 hover:text-white rounded w-full flex  justify-around items-center p-1 mb-2 "
            }
          >
            <IoSettings size={20} />
            Settings
          </NavLink>
          <NavLink
            to="/asd"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-500 text-white rounded flex border-solid border-gray-500  border-2 items-center justify-around p-1  mb-2"
                : "bg-gray-100 border-solid border-gray-500  border-2 text-gray-500 transition-all hover:bg-gray-500 hover:text-white rounded w-full flex  justify-around items-center p-1 mb-2 "
            }
          >
            <MdLiveHelp size={20} />
            Get Help
          </NavLink>
          <NavLink
            to="/das"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-500 text-white rounded flex border-solid border-gray-500  border-2 items-center justify-around p-1  mb-2"
                : "bg-gray-100 border-solid border-gray-500  border-2 text-gray-500 transition-all hover:bg-gray-500 hover:text-white rounded w-full flex  justify-around items-center p-1 mb-2 "
            }
          >
            <ChartNoAxesCombined /> statistics
          </NavLink>

          <Button
            component="label"
            role={undefined}
            variant="contained"
            fullWidth
            tabIndex={-1}
            startIcon={<RiLogoutCircleLine />}
          >
            Signout
          </Button>
        </div>
      </div>
    </>
  );
};

export default Profilenav;
