import { Router ,Request,Response,NextFunction} from "express";
import User from '../../modeles/user'
import bcypt from 'bcrypt'

const router=Router()

router.patch('/user/update/:id',async(req:Request,res:Response,next:NextFunction)=>{
    const userId=req.params.id;
    const {username,email,password}=req.body

    if(!userId) return next(new Error('Post id required'));

    const hashPassword=await bcypt.hash(password,10);
       
    let updateUser
    try {
          
        updateUser= await User.findByIdAndUpdate(
            {_id:userId},
            {$set:{username,email,password:hashPassword}},
            {new:true}
        )

    
    } catch (err) {

        next(new Error('Post can not updated')); 
    }
    res.status(200).json({message:updateUser})
})



export {router as updateUserRouter}


