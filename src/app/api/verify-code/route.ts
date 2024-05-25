import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/User";



export async function POST(request:Request) {
    await dbConnect()

    try {

        const {username , code} = await request.json()

        const decodedUsername = decodeURIComponent(username)

        const user = await UserModel.findOne({username:decodedUsername})

        if (!user) {
            return Response.json(
                {
                    success:false,
                    message:"User not found"
                },{status:402}
            )        
        }

        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.expireVerifyCode) > new Date()

        console.log(isCodeValid)

        if (isCodeValid && isCodeNotExpired) {
            user.isVerified = true
            await user.save()
            return Response.json(
                {
                    success:true,
                    message:"Account verified successfully "
                },{status:200}
            )   
        } else if (!isCodeNotExpired){
            return Response.json(
                {
                    success:false,
                    message:"Your verification code is expired please sign-up again to get new code"
                },{status:402}
            ) 
        } else {
            return Response.json(
                {
                    success:false,
                    message:"Invalid verify code please enter valid verify code"
                },{status:402}
            ) 
        }
        
    } catch (error) {
        console.error("Error Verifying user", error)
        return Response.json(
                {
                    success:false,
                    message:"Error Verifying user"
                },{status:500}
            )
        }


}