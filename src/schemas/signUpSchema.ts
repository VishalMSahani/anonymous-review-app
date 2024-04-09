import {z} from 'zod'

export const usernameValidation = z
            .string()
            .min(2, "Username must be more than 2 character")
            .max(15, "Username must not be more than 15 character")
            .regex(/^[a-zA-Z0-9_]+$/ , "username must not contain special character")



export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({message: "invalid email address"}),
  password: z.string().min(8,{message:"Password must be more than 8 character"}),
})

