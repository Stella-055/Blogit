import express, { Request, Response, Express } from "express";
import signuproute from "./Routes/signup";
import cors from "cors";
const app: Express = express();

app.use(express.json());
app.use(
  cors({
    origin:"http://localhost:5173",
    credentials: true,
  }),
);

app.get("/", (_req: Request, res: Response) => {
  res.send("welcome to blogIt");
});
app.use("/auth/signup", signuproute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is up and running on port ${port}`);
});
