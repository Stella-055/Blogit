import Button from "@mui/material/Button";
const Nav = () => {
  return (
    <div className="p-5 flex justify-between items-center border shadow-sm">
      <div className="flex items-center">
        <img src="/logoipsum-295.png" alt="logo" className="w-9" />
        <h2 className="text-blue-500 font-bold">BlogIt</h2>
      </div>
      <Button
        variant="contained"
        size="medium"
        href="/Signin"
        sx={{ backgroundColor: "black", color: "white" }}
      >
        SIGN IN
      </Button>
    </div>
  );
};

export default Nav;
