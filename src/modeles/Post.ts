import mongoose from "mongoose";
import { commentDoc } from "./Comment";



export interface PostDoc extends mongoose.Document{
    user:string,
    title:string,
    content:string,
    images:Array<{src:string}>,
    //comment?:Array<commentDoc>
}

export interface CreatePostDto{
    user:string,
    title:string,
    //images:Array<{src:string}>,
    content:string
}

export interface PostModule extends mongoose.Model<PostDoc>{
    build(dto:CreatePostDto):PostDoc
}

const postSchem=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    images:[
        {src:{type:String,
            required:true
        }}
    ],
    comment:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ]
    
})

postSchem.statics.build=(createPostDto:CreatePostDto)=>{
    return new Post(createPostDto)
}


const Post=mongoose.model<PostDoc,PostModule>("Post",postSchem)

export default Post