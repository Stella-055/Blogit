import express, { Request, Response, Express } from "express";
import signuproute from "./Routes/signup";
import signinroute from "./Routes/signin";
import userdetailsroute from "./Routes/userdetails";
import blogroute from "./Routes/blog";
import cors from "cors";
import cookie from "cookie-parser";
const app: Express = express();
app.use(cookie());
app.use(express.json());
app.use(
  cors({
    origin: ["https://blogingit.netlify.app","http://localhost:5173'"],
    credentials: true,
  }),
);

app.get("/", (_req: Request, res: Response) => {
  res.send("welcome to blogIt");
});
app.use("/api/auth/register", signuproute);
app.use("/api/auth/login", signinroute);
app.use("/api/blogs", blogroute);
app.use("/api/user", userdetailsroute);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is up and running on port ${port}`);
});
