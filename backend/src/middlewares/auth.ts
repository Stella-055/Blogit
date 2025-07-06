
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