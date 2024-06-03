import UserModel from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOption } from "../../auth/[...nextauth]/options";
import { dbConnect } from "@/lib/dbConnect";
import { User } from "next-auth";

export async function DELETE(request:Request, 
    {params}: {params:{messageid:string}}
) {
    const messageId = params.messageid.trim();
    console.log("Message Id : ", messageId);
    
    await dbConnect()
    const session = await getServerSession(authOption);
    const _user:User = session?.user as User ;
    console.log(_user);
    
    if (!session || !_user) {
        return Response.json(
            {
                success:false,
                message:"User not authenticated"
            },{
                status:401
            }
        );
    }

    try {

        const updateResult = await UserModel.updateOne(
            {_id: _user?._id},
            { $pull: {messages:{_id:messageId}}}
        );
        console.log(updateResult);
        

        if (updateResult.modifiedCount === 0) {
            return Response.json(
                {
                    success:false,
                    message:"Message not found or already deleted"
                },{
                    status:404
                }
            );
        }

        return Response.json(
            {
                success:true,
                message:"Message deleted successfully"
            },{
                status:200
            }
        );
        
    } catch (error) {
        console.error("Error in deleting message", error)
        return Response.json(
            {
                success:false,
                message:"Error in while deleting messsage"
            },{
                status:501
            }
        )

    }
}
