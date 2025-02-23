import { Router,Request,Response,NextFunction } from "express";
import Post from '../../modeles/Post'
import  User  from '../../modeles/user'
import{ uploadImages } from '../../common/'
import fs from 'fs'
import path from "path";




const router=Router();

router.post('/post/new/:id',uploadImages,async(req:Request,res:Response,next:NextFunction)=>{
   try {


        //if(!req.file)return next(new Error('Images required'));

        //let image:Array<Express.Multer.File>

        // if(typeof req.file==='object'){
        //     image=Object.values(req.file)
        // }else{
        //     image=req.file?[...req.file]:[]
        // }

        const {title,content}=req.body;
        const Id=req.params.id
        const userId=await User.findById(Id)

        if(!userId) return next(new Error('User id required or not exist'));

        if(!title){
            const error=new Error('Title is required') as CustomError;
            error.status=400
            return next(error)
        }
        if(!content){
            const error=new Error('Content is require') as CustomError
            error.status=400
            return next(error)
        }

        // images:images.map((file:Express.Multer.File)=>{
        //             let srcObj={src:`data:${file.mimetype};base64,${file.buffer.toString('base64')}`}
                    
        //             fs.unlink(path.join('uploads/' +file.filename),()=>{})

        //             return srcObj
        //         })

        let savePost
        try {
             savePost= Post.build({
                user:Id,
                title,
                content,
                
            });

            await savePost.save()

           await User.findByIdAndUpdate({_id:req.currentUser?.id},{$push:{posts:savePost._id}})

        } catch (err) {
            const error=new Error('Post can not created') as CustomError
            error.status=500;
            return next(error)
        }

        res.status(201).json({message:savePost});
   } catch (error) {
        next(new Error('Post can not created'));
   }
})

export {router as newPostRouter}