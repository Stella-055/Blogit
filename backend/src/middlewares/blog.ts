import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

import { userdetails } from "../types/type.d";
export const checkvaliduser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { signintoken } = req.cookies;
  if (!signintoken) {
    res.status(401).json({ message: "unauthorized user" });
    return;
  }

  jwt.verify(
    signintoken,
    process.env.JWT_SECRET!,
    function (
      err: VerifyErrors | null,
      decoded: JwtPayload | String | undefined,
    ) {
      if (err) {
        res.status(401).json({ message: "unauthorized user" });
      }
      req.owner = decoded as userdetails;
    },
  );
  next();
};

export const checkbloginputs = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, synopsis, content } = req.body;
    if (!title) {
      res.status(400).json({ message: "please provide a title" });
      return;
    }
    if (!synopsis) {
      res.status(400).json({ message: "please provide a synopsis" });
      return;
    }
    if (!content) {
      res
        .status(400)
        .json({ message: "please provide the content of the blog" });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
