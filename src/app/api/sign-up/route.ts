import bcrypt from 'bcryptjs'
import UserModel from '@/models/User'
import { dbConnect } from '@/lib/dbConnect'
import { sendVerificationEmail } from '@/helpers/sendVerificationEmail'


export async function POST(request:Request) {
 
    try {
        
    } catch (error) {
        console.error("Error in sign up route", error)
        return Response.json({
            status:false, 
            message:"Error while registring user Please try again later",
        }, {status:500}
    )
    }
    
}