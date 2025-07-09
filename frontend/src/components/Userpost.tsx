
import { MdDelete } from "react-icons/md";
import { MdBrowserUpdated } from "react-icons/md";
const Userpost = () => {
  return (
    <div className="mt-4 w-full flex flex-col justify-center items-center mb-3">
       <p className="text-xs bg-blue-200 text-blue-600 font-medium px-3 py-2 rounded-full my-2">Your Blogs</p> 
      <div className="flex border-solid border-gray-500 p-2 border-2 text-gray-500 w-2/4 justify-around"> <span>1.</span>cooking chapatis <div className="gap-2 flex"> <button><MdBrowserUpdated size={20}/></button> <button><MdDelete size={20} color="red"/></button></div></div>
    </div>
  )
}

export default Userpost
