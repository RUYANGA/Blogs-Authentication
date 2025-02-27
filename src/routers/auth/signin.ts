import User from "../../modeles/user";
import { Router,Request,Response,NextFunction } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { currentUser } from "src/common";

const router=Router();

router.post('/user/signin', async(req:Request,res:Response,next:NextFunction)=>{

    const {email,password}=req.body;
    if(!email) return next(new Error('Email is required'));
    if(!password) return next(new Error('Password is required'));

    const userExist=await User.findOne({email:email});
    if(!userExist) return next(new Error('Wronge credetials'));

    const comprePassword= await bcrypt.compare(password,userExist.password);

    if(!comprePassword) return next(new Error('Wronge credetials'));

    const token=jwt.sign(
        {
            email:userExist.email,
            id:userExist._id,
            isAdmin:userExist.isAdmin
        },
        process.env.JWT_KEY!,
        {
            expiresIn:'20day'
        }
    )

    req.session= { jwt:token}

    res.status(200).json({User:userExist,token:token})


})



export{ router as signinRouter}