import Button from "@mui/material/Button";
import useUser from "../stores/userStore";
import Avatar from '@mui/material/Avatar';
const Nav = () => {
  const{user}=useUser()
  return (
    <div className="p-5 flex justify-between items-center border shadow-sm">
      <div className="flex items-center">
        <img src="/logoipsum-295.png" alt="logo" className="w-9" />
        <h2 className="text-blue-500 font-bold">BlogIt</h2>
      </div>
      {user?<Avatar >{(user.username).slice(0,1)}</Avatar>:
      <Button
        variant="contained"
        size="medium"
        href="/Signin"
        sx={{ backgroundColor: "black", color: "white" }}
      >
        SIGN IN
      </Button>}
    </div>
  );
};

export default Nav;
