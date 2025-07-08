import express, { Request, Response, Express } from "express";
import signuproute from "./Routes/signup";
import signinroute from "./Routes/signin";
import cors from "cors";
import cookie from "cookie-parser";
const app: Express = express();
app.use(cookie());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/", (_req: Request, res: Response) => {
  res.send("welcome to blogIt");
});
app.use("/auth/signup", signuproute);
app.use("/auth/signin", signinroute);
app.use()

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is up and running on port ${port}`);
});
