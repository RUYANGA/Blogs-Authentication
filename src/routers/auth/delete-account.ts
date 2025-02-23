import { Router ,Request,Response,NextFunction} from "express";
import User from '../../modeles/user'


const router=Router()

router.delete('/user/delete/:id',async(req:Request,res:Response,next:NextFunction)=>{
    const userId=req.params.id;
    
    if(!userId) return next(new Error('Post id required'));
       
    let updateUser
    try {
          
        updateUser= await User.findByIdAndDelete({_id:userId})

    
    } catch (err) {

        next(new Error('Post can not updated')); 
    }
    res.status(200).json({message:"User deleted successfuly"})
})



export {router as deleteUserRouter}


