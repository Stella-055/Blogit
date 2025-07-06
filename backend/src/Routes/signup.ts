import { Router } from "express";
import { signupauth } from "../Controllers/auth.controllers";
const route= Router()

route.post("/",signupauth)

export default route