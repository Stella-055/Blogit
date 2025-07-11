import { Router } from "express";
import { fetchuserdetails } from "../Controllers/auth.controllers";
import { checkvaliduser } from "../middlewares/blog";
import { fetchuserblogs } from "../Controllers/blog.contoller";
import { primaryinfoupdate } from "../Controllers/auth.controllers";
import { checkinputupdates } from "../middlewares/auth";
const route = Router();

route.get("/", checkvaliduser, fetchuserdetails);
route.patch("/",checkvaliduser,checkinputupdates,primaryinfoupdate)
route.get("/blogs",checkvaliduser,fetchuserblogs)
export default route;