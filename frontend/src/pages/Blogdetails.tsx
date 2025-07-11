import { useParams } from "react-router-dom";
import { useQuery} from "@tanstack/react-query";

import api from "@/Api/Axios";

const Blogdetails = () => {
 const{id}=useParams()
 const {data,isLoading,error} = useQuery({
  queryKey: ["get-post-details"],
  queryFn: async () => {
    const response = await api.get(
      `/api/blog/${id}`,
    );

    return response.data;
  },
  
})



     
  return ( <>


  {error && <div className='w-full flex justify-center items-center'><img src="/500.jpg" alt="" /></div>}
    {isLoading && <div className='w-full flex justify-center items-center '><img src="/Loading_2.gif" alt="" /> </div>}
    {data && 
    <div>
      <img src="https://images.unsplash.com/photo-1560264418-c4445382edbc?q=80&w=800" alt="" />
      <h2></h2>
      <h3></h3>
      <p>shhhjridfuekjydeeendenmmmmdndms dnns cbgdie sjdjdns dncddj</p>
    </div> } </>
  )
}

export default Blogdetails
