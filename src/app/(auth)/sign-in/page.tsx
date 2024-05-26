'use client'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
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
import { signInSchema } from '@/schemas/signInSchema'
import { signIn } from 'next-auth/react'

function SignIn() {

    const { toast } = useToast()
    const router = useRouter()
    

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver:zodResolver(signInSchema) ,
        defaultValues:{
          identifier:'',
          password:''
        }   
    })

    const onSubmit = async(data: z.infer<typeof signInSchema>) => {
  
      const result = await signIn('credentials', {
          redirect:false,
          identifier: data.identifier,
          password: data.password
        })
      if (result?.error) {
        toast({
          title:'error in sign-in',
          description: "Error"
        })
      }
        if(result?.url){
          router.replace('/dashboard')
        }
      }

    

  return (

    <div className=' flex justify-center items-center '> 
      <div className=''>
        <Form {...form}>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                name="identifier"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type='email' placeholder="Please enter email" 
                        {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>password</FormLabel>
                    <FormControl>
                        <Input type='password' placeholder="Please enter password" 
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

export default SignIn