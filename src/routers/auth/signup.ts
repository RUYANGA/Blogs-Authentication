import { Router,Request,Response, NextFunction } from "express";
import User from '../../modeles/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router=Router()


router.post('/user/register',async(req:Request,res:Response,next:NextFunction)=>{

    const {username,email,password}=req.body;

    if(!username)return next(new Error('Username is required'))
    if(!email) return next(new Error('Email is required'))    
    
    if(!password) return next(new Error('Password is required'))
       
    const existUser=await User.findOne({email:email});

    const hashPassword:string= await bcrypt.hash(password,10);

    if(existUser) return next(new Error('User with the same email already exist'));
        

    const newUser=User.build({
        username,
        email,
        password:hashPassword,
    })

    await newUser.save()

    req.session={
        jwt:jwt.sign(
             {
            email:newUser.email,
            id:newUser._id,
            isAdmin:newUser.isAdmin
        },
        process.env.JWT_KEY!,
        {
            expiresIn:'20day'
        }
        )
    }

    res.status(201).json({User:newUser})

})
    
export {router as signupRouter}