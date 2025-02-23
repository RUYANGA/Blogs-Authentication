import { Router,Request,Response,NextFunction } from "express";
import Post from '../../modeles/Post'
import Comment from '../../modeles/Comment'



const router=Router();

router.post('/comment/new/:id',async(req:Request,res:Response,next:NextFunction)=>{
   try {
       const postId=req.params.id;
       const {username,content}=req.body;

       if(!postId) return next(new Error('Post id required'));
       

       if(!content) return next(new Error('Content required'))
         

       const newComments= Comment.build({
        username:username ? username:'Merci',
        content
       })
        await newComments.save()
       const updatePost=await Post.findByIdAndUpdate(
        {_id:postId},
        {$push:{comment:newComments}},
        {new:true}
        );


        res.status(200).json({message:updatePost})
    } catch (error) {
        next(new Error('Comment can not created'))
   }
})

export {router as newCommentRouter}