import bcrypt from 'bcryptjs'
import UserModel from '@/models/User'
import { dbConnect } from '@/lib/dbConnect'
import { sendVerificationEmail } from '@/helpers/sendVerificationEmail'


export async function POST(request:Request) {
 
    try {
        const {username , email, password } = await request.json()

        const existingUserVerifiedByUsername = await UserModel.findOne({
            username, 
            isVerified: true
        })

        if (existingUserVerifiedByUsername) {
            return Response.json(
                {
                    success: false,
                    message:" Username not available please choose different username "
                },{status:400}
            )
        }

        const existinguserByEmail = await UserModel.findOne({email})

        const verifyCode = Math.floor(1000000 + Math.random() * 900000).toString()

        if (existinguserByEmail) {

            if (existinguserByEmail.isVerified) {
                return Response.json({
                    success: false, 
                    message: "User with this email already exist please login"
                }, {status:400})
                
            } else {
                const hashedPassword = await bcrypt.hash(password , 10)

                existinguserByEmail.password = hashedPassword;
                existinguserByEmail.verifyCode = verifyCode;
                existinguserByEmail.expireVerifyCode = new Date(Date.now() + 3600000)
            }
            
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)

            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new UserModel({
                username,
                email,
                password:hashedPassword,
                messages: [],
                verifyCode,
                isVerified : false,
                expireVerifyCode : expiryDate,
                isAcceptingMessage : true,
            })

            await newUser.save()
        }
         //send verification email

         const emailResponse = await sendVerificationEmail( 
            email, 
            username,
            password
         )
         
         if (!emailResponse.success) {
            return Response.json({
                success: false, 
                message: emailResponse.message
            }, {status:500})
         }

         return Response.json({
            status: true, 
            message: "User registerd successfully"
         }, {status:202})
        
    } catch (error) {
        console.error("Error in sign up route", error)
        return Response.json({
            status:false, 
            message:"Error while registring user Please try again later",
        }, {status:500}
    )
    }
    
}