import { Request,Response,NextFunction } from "express";
import  Jwt  from "jsonwebtoken";

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
        const payload= (Jwt.verify(req.session?.jwt,process.env.JWT_KEY as string) as jwtPayload);
        req.currentUser=payload
    } catch (error) {
        return next(error)
    }

    next()

}