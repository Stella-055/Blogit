import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import IconButton from '@mui/material/IconButton';
  import { FaPen } from "react-icons/fa";
import DeleteIcon from '@mui/icons-material/Delete';


const Userpost = () => {
  return (
    <div  className="mt-4  flex flex-col items-center mb-3">
       <p className="text-xs bg-blue-200 text-blue-600 font-medium px-3 py-2 rounded-full my-2">Your Blogs</p> 
      <div style={{width:"30rem"}} className="flex border-solid border-gray-500 p-2 border-2 text-gray-500  justify-around"> <span>1.</span>cooking chapatis <div className="gap-2 flex"> <button><FaPen size={20}/></button> <Popover>
  <PopoverTrigger><IconButton aria-label="delete">
  <DeleteIcon />
</IconButton></PopoverTrigger>
  <PopoverContent>    <div className="flex flex-col items-center bg-white shadow-md rounded-xl py-6 px-5 md:w-[460px] w-[370px] border border-gray-300">
    <div className="flex items-center justify-center p-4 bg-red-100 rounded-full">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.875 5.75h1.917m0 0h15.333m-15.333 0v13.417a1.917 1.917 0 0 0 1.916 1.916h9.584a1.917 1.917 0 0 0 1.916-1.916V5.75m-10.541 0V3.833a1.917 1.917 0 0 1 1.916-1.916h3.834a1.917 1.917 0 0 1 1.916 1.916V5.75m-5.75 4.792v5.75m3.834-5.75v5.75" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </div>
    <h2 className="text-gray-900 font-semibold mt-4 text-xl">Are you sure?</h2>
    <p className="text-sm text-gray-600 mt-2 text-center">
        Do you really want to continue? This action<br/>cannot be undone.
    </p>
    <div className="flex items-center justify-center gap-4 mt-5 w-full">
        <button type="button" className="w-full md:w-36 h-10 rounded-md border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-100 active:scale-95 transition">
            Cancel
        </button>
        <button type="button" className="w-full md:w-36 h-10 rounded-md text-white bg-red-600 font-medium text-sm hover:bg-red-700 active:scale-95 transition">
            Confirm
        </button>
    </div>
</div>
  </PopoverContent>
</Popover></div></div>
    </div>
  )
}

export default Userpost
