import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOption } from "../auth/[...nextauth]/options";
import {User} from "next-auth"

export async function POST(request:Request) {
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
    const {acceptMessages} = await request.json()

    try {
        
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {isAcceptingMessage: acceptMessages},
            {new:true}
        )
        if (!updatedUser) {
            return Response.json(
                {
                    success:false,
                    message:"failed to update user status "
                },{status:402}
            )  
        }

        return Response.json(
            {
                success:true,
                message:"Message acceptance status updated successfully"
            },{status:200}
        ) 

    } catch (error) {
        console.log("failed to update user status to accept message")
        return Response.json(
            {
                success:false,
                message:"failed to update user status to accept message"
            },{status:500}
        ) 
    }

}


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
     
        const foundUser = await UserModel.findById(userId)
        if (!foundUser) {
            return Response.json(
                {
                    success:false,
                    message:"User not found"
                },{status:400}
            ) 
        }

        return Response.json(
            {
                success:true,
                message:"user found",
                isAcceptingMessages: foundUser.isAcceptingMessages
            },{status:200}
        ) 
     
    } catch (error) {
        console.log("failed to update user status to accept message")
        return Response.json(
            {
                success:false,
                message:"failed to update user status to accept message"
            },{status:500}
        ) 
    }

}