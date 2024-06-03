import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/options";
import {User} from "next-auth"
import mongoose from "mongoose";

export async function GET(request:Request) {
    await dbConnect()

    const session = await getServerSession(authOption)
    const _user: User = session?.user as User

    if (!session || !_user) {
        return Response.json(
            {
                success:false,
                message:"Not authenticated"
            },{status:401}
        ) 
    }

    const userId = new mongoose.Types.ObjectId(_user._id);

    try {
     
        const user = await UserModel.aggregate([
            {
                $match:{_id:userId}
            },
            {
                $unwind:"$messages"
            },
            {
                $sort:{'messages.createdAt':-1}
            },
            {
                $group:{_id:'$id', messages:{$push:'$messages'}}
            }
        ]) 
        
        if (!user) {
            return Response.json(
                {
                    success:false,
                    message:"user not found"
                },{status:402}
            )
        }

        return Response.json(
            { messages:user[0].messages },{status:200}
        )
     
    } catch (error) {
        console.log("Internal server error while getting message", error)
        return Response.json(
            {
                success:false,
                message:"No message to display"
            },{status:500}
        ) 
    }

}