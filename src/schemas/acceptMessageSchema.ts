import {z} from 'zod'

export const acceptMessageSchema = z.object({
    acceptmessage: z.boolean(),
    
})