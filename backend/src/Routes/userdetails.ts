import { Router } from "express";
import {
  fetchuserdetails,
  sendotp,
  verifyotp,
} from "../Controllers/auth.controllers";
import { checkvaliduser } from "../middlewares/blog";
import { fetchuserblogs } from "../Controllers/blog.contoller";
import {
  primaryinfoupdate,
  updateuserpassword,updatepassword
} from "../Controllers/auth.controllers";
import {
  checkifpassword,
  checkinputupdates,
  generateopt,
} from "../middlewares/auth";
import {
  checkpasswordinputs,
  checkpasswordvalidity,
  checkpasswordstrength,
  checkemail,
  checkvalidemail,
} from "../middlewares/auth";
const route = Router();

route.get("/", checkvaliduser, fetchuserdetails);
route.patch("/", checkvaliduser, checkinputupdates, primaryinfoupdate);
route.get("/blogs", checkvaliduser, fetchuserblogs);
route.patch(
  "/password",
  checkvaliduser,
  checkpasswordinputs,
  checkpasswordvalidity,
  checkpasswordstrength,
  updateuserpassword,
);
route.post(
  "/forgotpassword",
  checkemail,
  checkvalidemail,
  generateopt,
  sendotp,
);
route.post("/forgotpassword/:id", verifyotp);
route.post(
  "/updatepassword/:id",
  checkifpassword,
  checkpasswordstrength,
  updatepassword
);
export default route;
