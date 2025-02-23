import { Router ,Request,Response,NextFunction} from "express";
import Post from '../../modeles/Post'
import { requireOwner } from "../../common";

const router=Router()

router.post('/post/update/:id',requireOwner,async(req:Request,res:Response,next:NextFunction)=>{
    const postId=req.params.id;
    const {title,content}=req.body

    if(!postId) return next(new Error('Post id required'));
       
    let updatePost
    try {
          
        updatePost= await Post.findByIdAndUpdate(
            {_id:postId},
            {$set:{title,content}},
            {new:true}
        )

    
    } catch (err) {

        next(new Error('Post can not updated')); 
    }
    res.status(200).json({message:updatePost})
})



export {router as updatePostRouter}


