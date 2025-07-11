import { Router } from "express";
import { fetchuserdetails } from "../Controllers/auth.controllers";
import { checkvaliduser } from "../middlewares/blog";
import { fetchuserblogs } from "../Controllers/blog.contoller";
import { primaryinfoupdate,updateuserpassword  } from "../Controllers/auth.controllers";
import { checkinputupdates} from "../middlewares/auth";
import { checkpasswordinputs,checkpasswordvalidity,checkpasswordstrength } from "../middlewares/auth";
const route = Router();

route.get("/", checkvaliduser, fetchuserdetails);
route.patch("/",checkvaliduser,checkinputupdates,primaryinfoupdate)
route.get("/blogs",checkvaliduser,fetchuserblogs)
route.patch("/password",checkvaliduser,checkpasswordinputs,checkpasswordvalidity,checkpasswordstrength,updateuserpassword)
export default route;