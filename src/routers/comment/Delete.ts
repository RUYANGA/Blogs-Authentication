import { Router,Request,Response,NextFunction } from "express";
import Post from '../../modeles/Post'
import Comment from "../../modeles/Comment";


const router=Router();

router.delete('/comment/:commentId/delete/:postId',async(req:Request,res:Response,next:NextFunction)=>{

       const {commentId,postId}=req.params;

       if(!postId)return next(new Error('Post id required'))
       
       if(!commentId) return next(new Error('Comment id required'))
        
      try {
            const deleteCom=await Comment.findByIdAndDelete({_id:commentId});
      } catch (error) {
        next(new Error('Comment can not deleted'))
      }
      const post= await Post.findByIdAndUpdate({_id:postId},{$pull:{comment:commentId}})
       res.status(200).json({message:post})
        
})

export {router as deleteCommentRouter}