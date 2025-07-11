import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
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

export const signinauth = async (req: Request, res: Response) => {
  try {
    const { useremail } = req.body;

    const userdetails = await prisma.user.findFirst({
      where: {
        useremail: useremail,
      },
    });
    const { id, firstname, lastname, username } = userdetails!;

    const token = jwt.sign(
      { id, firstname, lastname, username },
      process.env.JWT_SECRET!,
     
    );

    res
      .cookie("signintoken", token)
      .status(200)
      .json({id:id, username: username, lastname: lastname, firstname: firstname });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const fetchuserdetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.owner;

    const userdetails = await prisma.user.findFirst({
    where:{id},
    
    });
    res.status(200).json( userdetails );
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const primaryinfoupdate=async(req:Request,res:Response)=>{
  try {
  const { id } = req.owner;
  const{username,firstname,lastname,useremail}=req.body
   
    const newrecord= await prisma.user.update({
      where:{id:id},
      data:{username,lastname,firstname,useremail}
    })
    res.status(200).json({message:"updated details successfully",newrecord})
  } catch (error) {
    res.status(500).json({ message: "something went terribly wrong", });
  }
}
export const updateuserpassword = async (req: Request, res: Response) => {
  try {
    const {  password } = req.body;
    const{id}=req.owner
    const hashedpswd = await bcrypt.hash(password, 10);

    const newuser = await prisma.user.update({
      where:{id},
      data: {  password: hashedpswd },
    });

    res.status(200).json({ message: "password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
