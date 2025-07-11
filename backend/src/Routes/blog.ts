import { createblog,fetchblog,fetchblogs} from "../Controllers/blog.contoller";
import { checkvaliduser, checkbloginputs } from "../middlewares/blog";
import { Router } from "express";

const route = Router();

route.post("/", checkvaliduser, checkbloginputs, createblog);
route.get("/:blogId",checkvaliduser,fetchblog)
route.get("/",checkvaliduser,fetchblogs)

export default route;
