
import Profiledetails from './Profiledetails';
import Userpost from './Userpost';
import Profilenav from './Profilenav';
const Profile = () => {
  
  return <>
  <div className=' flex  flex-col justify-center items-center bg-gray-100 ' > 
  <div className='flex items-center gap-4 justify-center flex-wrap w-full'>
 
 <Profilenav/>
  <Profiledetails/>
  </div>
  <Userpost/></div> </>
};

export default Profile;
