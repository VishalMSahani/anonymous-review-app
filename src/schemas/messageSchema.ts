import {z} from 'zod'

export const messagesSchema = z.object({
    content: z
            .string()
            .min(4,{message:"Content must be grater than 4 character"})
            .max(300, {message:"Content must be less that 200 character"})
            
    
})