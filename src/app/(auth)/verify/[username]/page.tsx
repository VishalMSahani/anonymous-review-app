'use client'
import { useToast } from '@/components/ui/use-toast'
import { verifySchema } from '@/schemas/verifySchema'
import { ApiResponse } from '@/types/ApiResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form,
        FormControl, 
        FormField, 
        FormItem, 
        FormLabel, 
        FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function VerifyAccount() {

    const { toast } = useToast()
    const router = useRouter()
    const params = useParams()

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver:zodResolver(verifySchema)    
    })

    const onSubmit = async(data: z.infer<typeof verifySchema>) => {
  
        try {
          const response = await axios.post<ApiResponse>('/api/verify-code', {
            username: params.username,
            code: data.code,
          })
          toast({
            title: 'Success', 
            description: response.data.message
          })
          router.replace('/sign-in')

        } catch (error) {
          console.error("error while verifing code", error)
          const axiosError = error as AxiosError<ApiResponse>;
          let errorMessage = axiosError.response?.data.message 
          toast({
            title:"Sign-up failed", 
            description: errorMessage, 
            variant:'destructive'
          })
        }
  
      }

    

  return (

    <div className=' flex justify-center items-center '> 
      <div className=''>
        <Form {...form}>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                name="code"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                        <Input placeholder="Please enter verification code" 
                        {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <Button type='submit'>
                    Submit
                </Button>

            </form>
        </Form>
        </div>
    </div>
  )
}

export default VerifyAccount