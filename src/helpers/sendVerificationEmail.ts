import { resend } from "@/lib/resend";
import verificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";


export async function sendVerificationEmail(
    email: string,
    username:string,
    verifyCode:string,
):Promise<ApiResponse>{

    try {
        
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Mystry Message || Verification Code',
            react: verificationEmail({username, otp: verifyCode}),
          });

        return{success:true, message:"Verification email sent successfully"}
    } catch (error) {
        console.error("Error in sendig email", error)
        return{success:false, message:"Failed to send verification email"}
    }

} 

