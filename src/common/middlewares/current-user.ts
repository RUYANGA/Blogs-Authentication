import { Request,Response,NextFunction } from "express";
import  jwt  from "jsonwebtoken";

declare global{
    interface jwtPayload{
        email:string,
        password:string,
        isAdmin:boolean,
        id:string
    }
    namespace Express{
        interface Request{
            currentUser?:jwtPayload
        }
    }
}

export const currentUser=async(req:Request,res:Response,next:NextFunction)=>{
    if(!req.session?.jwt){
        next()
    }

    try {
        const payload = jwt.verify(req.session?.jwt, process.env.JWT_KEY as string) as jwtPayload;
        req.currentUser = payload;
    } catch (error) {
        return next()
    }

    next()

}