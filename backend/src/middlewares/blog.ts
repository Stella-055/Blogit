import { Request, Response, NextFunction } from "express";
import jwt ,{JwtPayload,VerifyErrors} from "jsonwebtoken";

const checkvaliduser= async(req:Request,res:Response,next:NextFunction)=>{
 const{signintoken}=req.cookies
 if(!signintoken){
    res.status(401).json({message:"unauthorized user"})
    return
 }

jwt.verify(signintoken,process.env.JWT_SECRET!, function(err:VerifyErrors|null, decoded:JwtPayload|String|undefined){

if(err){
    res.status(401).json({message:"unauthorized user"})  
}
req.owner= decoded
})

}