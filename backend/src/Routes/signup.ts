import { Router } from "express";
import { signupauth } from "../Controllers/auth.controllers";
import { checkinputs } from "../middlewares/auth";
const route= Router()

route.post("/",checkinputs,signupauth)

export default route