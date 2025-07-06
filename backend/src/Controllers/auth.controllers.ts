import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export const signupauth = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, username, useremail, password } = req.body;
    const hashedpswd = await bcrypt.hash(password, 10);

    const newuser = await prisma.user.create({
      data: { firstname, lastname, username, useremail, password: hashedpswd },
    });

    res.status(200).json({ message: "user created successfully" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
