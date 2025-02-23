import { Request,Response,NextFunction } from "express";
import Post from "../../modeles/Post";

export const requireOwner=async(req:Request,res:Response,next:NextFunction)=>{

    const post=await Post.findById(req.params.id);
    if(req.currentUser?.id !==post?.user.toString()) return next(new Error('Owner access required'));
        console.log(req.currentUser?.isAdmin);
        console.log(post?.user)
        console.log(req.currentUser?.id);
        next()
}