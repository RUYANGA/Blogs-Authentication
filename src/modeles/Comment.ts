import mongoose from "mongoose";


export interface commentDoc extends mongoose.Document{
    username?:string,
    content:string
}


export interface createCommentDto{
    content:string,
    username?:string
}

export interface commentModel extends mongoose.Model<commentDoc>{
    build(dto:createCommentDto):commentDoc
}

const commentSchem=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
    
})


commentSchem.statics.build=(createCommentDto:createCommentDto)=>{
    return new Comment(createCommentDto)
}

const Comment=mongoose.model<commentDoc,commentModel>("Comment",commentSchem)

export default Comment