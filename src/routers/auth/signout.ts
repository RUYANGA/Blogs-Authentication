import { Router,Request,Response,NextFunction } from "express";



const router=Router()

router.post('/user/signout',async(req:Request,res:Response,net:NextFunction)=>{
    req.session=null
    res.status(200).json({message:"Logout successfuly"})
})
export {router as signoutRouter}