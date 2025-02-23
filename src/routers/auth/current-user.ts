import { Router,Request,Response, NextFunction } from "express";
import { currentUser } from "../../common";


const router=Router()

router.get('/current-user',currentUser,(req:Request,res:Response,net:NextFunction)=>{
    res.status(200).json({currentUser:req.currentUser})
})

export {router as currentUser}