import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/User";
import {z} from 'zod'
import { usernameValidation } from "@/schemas/signUpSchema";
import { url } from "inspector";

const UsernameQuerySchema = z.object({
    username:usernameValidation
})

export async function GET(request:Request) {
    await dbConnect()

    try {
        const {searchParams} = new URL(request.url)
        const queryParam = { username: searchParams.get('username')}

        const result = UsernameQuerySchema.safeParse(queryParam)
        console.log(result)

        if (!result.success) {
            const usernameError = result.error.format().username?._errors || []
            return Response.json(
                {
                    success: false,
                    message:"Invalid query parameter"
                },{status:400}
            )
        }

        const {username} = result.data

        const existingUser = await UserModel.findOne({username, isVerified:true})

        if (existingUser) {
            return Response.json(
                {
                    success: false,
                    message:"Username is already taken"
                },{status:400}   
            )
        }

        return Response.json(
            {
                success: true,
                message:"Username exists"
            },{status:400}   
        )



    } catch (error) {
        console.error("Error Checking username", error)
        return Response.json(
            {
                success:false,
                message:"Error checking username"
            },{status:500}
    )
    }
}