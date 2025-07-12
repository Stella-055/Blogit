import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const createblog = async (req: Request, res: Response) => {
  try {
    const { id, username } = req.owner;
    const { title, synopsis, content, blogimage } = req.body;
    await prisma.blog.create({
      data: {
        title,
        synopsis,
        content,
        authorId: id,
        blogimage,
        authorname: username,
      },
    });
    res.status(200).json({ message: "user created successfully" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const fetchblogs = async (req: Request, res: Response) => {
  try {
    const userblogs = await prisma.blog.findMany({
      where: { isDeleted: false },
    });

    res.status(200).json(userblogs);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
export const fetchuserblogs = async (req: Request, res: Response) => {
  try {
    const { id } = req.owner;

    const userblogs = await prisma.blog.findMany({
      where: { AND: [{ authorId: id }, { isDeleted: false }] },
    });
    userblogs
      ? res.status(200).json(userblogs)
      : res.status(400).json({ message: "No blogs found" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
export const fetchblog = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;

    const blog = await prisma.blog.findFirst({
      where: { id: blogId },
    });

    blog
      ? res.status(200).json(blog)
      : res.status(400).json({ message: "Blog probably does not exists" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const updateblog = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;
    const { title, synopsis, content, blogimage } = req.body;
    const updatedblog = await prisma.blog.update({
      where: { id: blogId },
      data: { title, synopsis, content, blogimage },
    });
    updatedblog
      ? res.status(200).json({ message: "updated blog successfully" })
      : res.status(400).json({ message: "Blog does not exist" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const deleteblog = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;
    const deletedblog = await prisma.blog.update({
      where: { id: blogId },
      data: { isDeleted: true },
    });
    deletedblog
      ? res.status(200).json({ message: "deleted blog successfully" })
      : res.status(400).json({ message: "Blog does not exist" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
