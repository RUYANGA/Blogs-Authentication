import { Request,Response,NextFunction } from "express";


export const requireAuth=(req:Request,res:Response,next:NextFunction)=>{
    if(!req.currentUser) return next(new Error('Not authorized'));
    next()
};