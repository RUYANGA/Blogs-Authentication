import * as dotenv from "dotenv";
dotenv.config();

import express ,{ Request,Response ,NextFunction, Application } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieSession from "cookie-session";
import {newPostRouter,showPostRouter,updatePostRouter,deletePostRouter,newCommentRouter,deleteCommentRouter,signupRouter, signinRouter, updateUserRouter, deleteUserRouter} from './routers'
import { currentUser, requireAuth } from "./common";
import { signoutRouter } from "./routers/auth/signout";

const url=process.env.MONGODB_URL as string
const Port=process.env.PORT || 4000
const app: Application=express()

app.set('trust proxy',true)
app.use(express.json())
app.use(cookieSession({
    signed:false,
    secure:false
}))
app.use(cors(
    {
        origin:'*',
        optionsSuccessStatus:200
    }
))
app.use(express.urlencoded({extended:false}))


mongoose.connect(url).then(()=>{

    console.log('MongoDb connected successfuly')
    app.listen(Port,()=>{
        console.log(`Server is running at http://localhost/${Port} port`)
    })

}).catch((error)=>{

    console.log('Error to connect DB',error)
})
//Post routers
app.use(signupRouter)
app.use(signinRouter)
app.use(signoutRouter)


app.use(currentUser)
app.use(requireAuth,showPostRouter);
app.use(requireAuth,newPostRouter);
app.use(requireAuth,updatePostRouter);
app.use(requireAuth,deletePostRouter);
app.use(requireAuth,updateUserRouter)
app.use(requireAuth,deleteUserRouter)
app.use(requireAuth,newCommentRouter)
app.use(requireAuth,deleteCommentRouter)


app.all('*',(req,res,next)=>{
    const error=new Error('Not found!') as CustomError
    error.status=404
    next(error)
})

declare global {
    interface CustomError extends Error {
        status?: number;
    }
}

//Error handling Mindleware
app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (error.status) {
        res.status(error.status).json({ message: error.message });
        return;
    }
    res.status(500).json({ message: error.message || "Something went wrong" });
    return;
});
