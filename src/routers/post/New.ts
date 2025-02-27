import { Router,Request,Response,NextFunction } from "express";
import Post from '../../modeles/Post'
import  User  from '../../modeles/user'
import cloudinary from "../../common/utile/cloudinaryConfg";
import upload from "../../common/utile/multer";





const router=Router();

router.post('/post/new/:id',upload.single('image'),async(req:Request,res:Response,next:NextFunction)=>{
   try {


        if(!req.file){
            const error=new Error('Image required') as CustomError;
            error.status=400
            return next(error)
        }
    
        const resultImage=await cloudinary.uploader.upload(req.file.path,{
            folder:'uploads'
        })
        console.log('images',resultImage)
        

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

    
        const savePost= Post.build({
                user:Id,
                title,
                content,
                images:resultImage.secure_url
                
            });

            await savePost.save()

           await User.findByIdAndUpdate({_id:req.currentUser?.id},{$push:{posts:savePost._id}})
           res.status(200).json({Posts:savePost})

    } catch (err) {
            const error=new Error('Post can not created') as CustomError
            error.status=500;
            return next(error)
            console.log(err)
        }
})

export {router as newPostRouter}