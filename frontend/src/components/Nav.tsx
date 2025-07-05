
import Button from '@mui/material/Button';
const Nav = () => {
  return (
    <div className='p-5 flex justify-between items-center border shadow-sm'> 
    <div className="flex items-center">
    <img src="/logoipsum-295.png" alt='logo' className="w-9"/>
    <h3 className="text-indigo-600 font-bold">BlogIt</h3>
    </div>
    <Button variant="contained" size="medium" href="/Login" sx={{backgroundColor:"black",color:"white"}}>LogIn</Button>
  </div>
  )
}

export default Nav
