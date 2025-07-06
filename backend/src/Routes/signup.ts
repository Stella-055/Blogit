import { Router } from "express";
import { signupauth } from "../Controllers/auth.controllers";
import { checkinputs,checkemailandusername ,checkpasswordstrength} from "../middlewares/auth";
const route= Router()

route.post("/",checkinputs,checkemailandusername,checkpasswordstrength,signupauth)

export default route