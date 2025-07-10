import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import api from "@/Api/Axios";
const Blogdetails = () => {

    const {data,isLoading,error} = useQuery({
        queryKey: ["get-user-posts"],
        queryFn: async () => {
          const response = await api.get(
            "/user/blog",
          );
     
          return response.data;
        },
        
      })
      if(isLoading){
        return <img src="/Loading_2.gif" alt="" />
      }
      if(error){
        return <img src="/smtwrong.gif" alt="" />
      }
  return (
    <div>
      <img src="https://images.unsplash.com/photo-1560264418-c4445382edbc?q=80&w=800" alt="" />
      <h2></h2>
      <h3></h3>
      <p>shhhjridfuekjydeeendenmmmmdndms dnns cbgdie sjdjdns dncddj</p>
    </div>
  )
}

export default Blogdetails
