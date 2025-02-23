import { Router,Request,Response,NextFunction } from "express";
import Post from '../../modeles/Post'


const router=Router();

router.get('/post/show/',async(req:Request,res:Response,next:NextFunction)=>{
   try {
        const { postId } = req.body
        if(postId) return next(await Post.findById({_id:postId}));
          
        const showPost= await Post.find().populate("comment").populate("user");
        res.status(200).json({Posts:showPost})
        
   } catch (err) {
    next(new Error('Post can not show'))
   }
})

export {router as showPostRouter}