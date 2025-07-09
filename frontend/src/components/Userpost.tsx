import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import IconButton from '@mui/material/IconButton';
  import { FaPen } from "react-icons/fa";
import DeleteIcon from '@mui/icons-material/Delete';

import { MdBrowserUpdated } from "react-icons/md";
const Userpost = () => {
  return (
    <div className="mt-4 w-full flex flex-col justify-center items-center mb-3">
       <p className="text-xs bg-blue-200 text-blue-600 font-medium px-3 py-2 rounded-full my-2">Your Blogs</p> 
      <div className="flex border-solid border-gray-500 p-2 border-2 text-gray-500 w-2/4 justify-around"> <span>1.</span>cooking chapatis <div className="gap-2 flex"> <button><FaPen size={20}/></button> <Popover>
  <PopoverTrigger><IconButton aria-label="delete">
  <DeleteIcon />
</IconButton></PopoverTrigger>
  <PopoverContent>        <h4 className="leading-none font-medium">Are You sure you want to delete  </h4>
    <div><button>Yes</button><button>No</button></div>
  </PopoverContent>
</Popover></div></div>
    </div>
  )
}

export default Userpost
