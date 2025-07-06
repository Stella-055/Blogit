import { PrismaClient } from "@prisma/client";
import zxcvbn from 'zxcvbn';

const prisma = new PrismaClient();
import   { Request, Response,NextFunction } from "express"
 export const checkinputs=(req:Request,res:Response,next:NextFunction)=>{

try {
    const{firstname,lastname,username,useremail,password}=req.body
    if(!firstname){
        res.status(400).json({message:"please provide first name"})
        return 
    }
    if(!lastname){
        res.status(400).json({message:"please provide last name"})
        return 

    }
    if(!username){
       res.status(400).json({message:"please provide user name"})
        return 
    }
    if(!useremail){
        res.status(400).json({message:"please provide an email"})
        return 
    }
    if(!password){
        res.status(400).json({message:"please provide a password"})
        return 
    }
    next()
    
} catch (error) {
    res.status(500).json({message:"something went wrong"})
}
}

export const checkemailandusername= async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const{username,useremail}=req.body
        const userName = await prisma.user.findFirst({
            where:{username:username}
        })
        if(userName){
            res.status(400).json({message:"user name already exists"})
            return
        }
        const userEmail = await prisma.user.findFirst({
            where:{useremail:useremail}
        })
        if(userEmail){
            res.status(400).json({message:"Email already exists"})
            return
        }
        next()
    } catch (error) {
        res.status(500).json({message:"something went wrong"})
    }

}

 export const checkpasswordstrength=  (req:Request,res:Response,next:NextFunction)=>{
   try {
    
    const{password}=req.body
    const {score}=  zxcvbn(password)
    if (score < 3) {
         res.status(400).json({message: "Password is too weak", })
         return

} next()
} catch (error) {
   res.status(500).json({message:"something went wrong"}) 
}

}