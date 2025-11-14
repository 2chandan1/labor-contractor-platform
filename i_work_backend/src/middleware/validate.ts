import {Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import jwt from 'jsonwebtoken';
export const validateBody=(schema:ObjectSchema)=>{
    return (req:Request, res:Response, next:NextFunction)=>{
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const details = error.details.map((detail) => detail.message);
            return res.status(400).json({ message: 'Validation error',errors: details });
        }
        next();
    }
}

export interface AuthRequest extends Request{
    user ?:any

}

export const verifyTocken=(
    req:AuthRequest,
    res:Response,
    next:NextFunction
)=>{
    try{
        const authHeader=req.headers.authorization;
        console.log("authheader",authHeader);
        
        if(!authHeader|| !authHeader.startsWith("Bearer")){
            return res.status(401).json({message:"Access Denied. No Token provided"})
        }
        const token=authHeader.split(" ")[1]
        if (!token) {
            return res.status(401).json({ message: "Token missing" });
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET!);
        req.user=decoded;
        next();
    }catch(error){
        return res.status(401).json({message:"Invalid or expired token."})
    }
}