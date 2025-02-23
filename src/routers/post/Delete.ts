import { Router,Request,Response,NextFunction } from "express";
import Post from '../../modeles/Post';
import  { UserDoc }  from "../../modeles/user";
import User from "../../modeles/user";
import { requireOwner } from "../../common";


const router=Router();

router.delete('/post/delete/:id',requireOwner,async(req:Request,res:Response,next:NextFunction)=>{
   
    const postId=req.params.id;

    if(!postId) return next(new Error('Post id required'));

    
    try{

       await Post.findByIdAndDelete({_id:postId})
       
   } catch (error) {
        next(new Error('Post can not be deleted'))
   }

      const user:UserDoc|null =await User.findOneAndUpdate({_id:req.currentUser?.id},{$pull:{posts:postId}},{new:true})

      if(!user) return next(new Error('Can not update user'))

       res.status(200).json({message:user})
})

export {router as deletePostRouter}