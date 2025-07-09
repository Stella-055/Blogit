import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const createblog = async (req: Request, res: Response) => {
  try {
    const { id } = req.owner;
    const { title, synopsis, content } = req.body;
    const newblog = await prisma.blog.create({
      data: { title, synopsis, content, authorId: id },
    });
    res.status(200).json({ message: "user created successfully" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const fetchuserblogs = async (req: Request, res: Response) => {
  try {
    const { id } = req.owner;

    const userblogs = await prisma.user.findFirst({
    where:{id:id},
    include
    });
    res.status(200).json({ message: "user created successfully" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
