import mongoose from "mongoose";
import { PostDoc } from "./Post";


export interface UserDoc extends mongoose.Document{
    username:string,
    email:string,
    password:string,
    posts?:Array<PostDoc>
    isAdmin:boolean
}

export interface CreateUserDto{
    username:string,
    email:string,
    password:string,
    posts?:Array<any>

}

export interface UserModel extends mongoose.Model<UserDoc>{
    build(dto:CreateUserDto):UserDoc
}

const userSchem=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ],
    isAdmin:{
        type:Boolean,
        default:false
    }
});

userSchem.statics.build = (createUserDto:CreateUserDto) => {
  return new User(createUserDto)
};

const User =mongoose.model<UserDoc,UserModel>('User',userSchem)
export default User
