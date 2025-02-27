import multer from "multer";
import path from'path'


const allowedFormat=['.jpg','.png','.jpeg','.gif','.webp'];

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'upload/')
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}${path.extname(file.originalname)}`)
    }
})

const fileFilter=(req:Express.Request,file:Express.Multer.File,cb:multer.FileFilterCallback)=>{
    const ext=path.extname(file.originalname).toLowerCase()

    if(allowedFormat.includes(`${ext}`)){
        cb(null,true)
    }else{
        cb(new Error(`Invalid file format type must be in ${allowedFormat}`))
    }
}

const upload=multer({storage,fileFilter})

export default upload