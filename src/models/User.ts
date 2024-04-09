
import mongoose ,{Schema , Document} from "mongoose";

export interface Message extends Document{
    content: string;
    createdAt:Date
}

const MessageSchema: Schema<Message> = new Schema({

    content: {
         type: String,
          required: true 
    },
    createdAt:{
        type: Date, 
        required:true, 
        default: Date.now
    }
})

export interface User extends Document{

    username: string;
    email:string;
    password:string;
    messages:Message[] // one to many relationship with message model
    verifyCode : string;
    isVerified : boolean;
    expireVerifyCode : Date;
    isAcceptingMessage : boolean;
}

const UserSchema: Schema<User> = new Schema({

    username:{
        type:String,
        required:[true,"Username is required"],
        unique: true,
        trim:true,
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        required:[true,"Email is required"]
    },
    password:{
        type: String,
        required:[true, "Password is required"]
    },
    verifyCode : { 
        type:String ,
        required:[true, "verify code is required"] 
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    expireVerifyCode:{
        type:Date,
        required:[true, "expire verify code is required"]
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true
    },
    messages:[MessageSchema]

})

const UserModel = (mongoose.models.User as mongoose.Model<User>) 
|| mongoose.model<User>("User", UserSchema);

export default UserModel;