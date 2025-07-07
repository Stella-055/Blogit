import { Router } from "express";
import { signinauth } from "../Controllers/auth.controllers";
import { signinemailpswdcheck } from "../middlewares/auth";

const route = Router();

route.post("/", signinemailpswdcheck, signinauth);
export default route;
