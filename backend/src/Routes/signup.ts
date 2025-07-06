import { Router } from "express";
import { signupauth } from "../Controllers/auth.controllers";
import { checkinputs,checkemailandusername } from "../middlewares/auth";
const route= Router()

route.post("/",checkinputs,checkemailandusername,signupauth)

export default route