import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/options";
import {User} from "next-auth"

export async function GET(request:Request) {
    await dbConnect()

    const session = await getServerSession(authOption)
    const user: User = session?.user as User

    if (!session || !session.user) {
        return Response.json(
            {
                success:false,
                message:"Not authenticated"
            },{status:401}
        ) 
    }

    const userId = user._id;

    try {
     
        const user = await UserModel.aggregate([
            {
                $match:{id:userId}
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
        
        if (!user || user.length === 0) {
            return Response.json(
                {
                    success:false,
                    message:"user not found"
                },{status:402}
            )
        }

        return Response.json(
            {
                success:true,
                message:user[0].messages
            },{status:200}
        )
     
    } catch (error) {
        console.log("Internal server error while getting message", error)
        return Response.json(
            {
                success:false,
                message:"Internal server error while getting message"
            },{status:500}
        ) 
    }

}