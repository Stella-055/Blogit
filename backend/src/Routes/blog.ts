import { createblog } from "../Controllers/blog.contoller";
import  { checkvaliduser } from '../middlewares/blog';
import { Router } from "express";

const route =Router()

route.post("/",checkvaliduser,createblog)
export default route