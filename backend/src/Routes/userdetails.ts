import { Router } from "express";
import { fetchuserdetails } from "../Controllers/auth.controllers";
import { checkvaliduser } from "../middlewares/blog";
const route = Router();

route.get("/", checkvaliduser, fetchuserdetails);
export default route;