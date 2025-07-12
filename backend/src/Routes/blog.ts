import {
  createblog,
  fetchblog,
  fetchblogs,
  updateblog,
  deleteblog,
} from "../Controllers/blog.contoller";
import { checkvaliduser, checkbloginputs } from "../middlewares/blog";
import { Router } from "express";

const route = Router();

route.post("/", checkvaliduser, checkbloginputs, createblog);
route.get("/:blogId", checkvaliduser, fetchblog);
route.get("/", checkvaliduser, fetchblogs);
route.patch("/:blogId", checkvaliduser, checkbloginputs, updateblog);
route.delete("/:blogId", checkvaliduser, deleteblog);
export default route;
