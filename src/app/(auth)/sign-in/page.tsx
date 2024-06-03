'use client'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
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
import Image from 'next/image'
import SignInImg from '../../../assets/Tablet login-pana.svg'
import Link from 'next/link'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import NavBar from '@/components/NavBar'
import { Loader2 } from 'lucide-react'

function SignIn() {

    const { toast } = useToast()
    const router = useRouter()
    const [isPasswordVisible , setIsPasswordVisible] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    
    const tooglePAssword = () => {
      setIsPasswordVisible(!isPasswordVisible)
    }

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver:zodResolver(signInSchema) ,
        defaultValues:{
          identifier:'',
          password:''
        }   
    })

    const onSubmit = async(data: z.infer<typeof signInSchema>) => {
      setisLoading(true)
  
      const result = await signIn('credentials', {
          redirect:false,
          identifier: data.identifier,
          password: data.password
        })
        setisLoading(false)
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
    <div>
    {/* <NavBar/> */}
    <div className='flex justify-center items-center flex-col bg-lighter-green-1 h-full lg:flex-row lg:px-40 px-10 min-h-screen'> 
    <div className='my-8 text-center text-gray-700 flex flex-col justify-center items-center w-full lg:mt-8'>
        <p className='text-3xl font-bold my-3 text-darker-turquoise'>Welcome Back!</p>
        <p className='text-[25px] font-semibold'>Log in to Your Account</p>
        <p className='text-[15px] mb-5'>Access your dashboard and manage your feedback.</p>
        <Image src={SignInImg} alt='sign-up-Img' width={300}/>
      </div>
      <div className='w-full'>
        <Form {...form}>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                name="identifier"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email or Username</FormLabel>
                    <FormControl>
                        <Input placeholder="Please enter email / username" 
                        className='bg-lighter-green-0'
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
                        <Input type={isPasswordVisible? "text" : "password"} placeholder="Please enter password"
                        className='bg-lighter-green-0' 
                        {...field} 
                        />
                          
                    </FormControl>
                    <div onClick={tooglePAssword} className='text-center cursor-pointer px-3 relative w-full'>
                      {
                        isPasswordVisible ? (<FaRegEye/>) : ( <FaRegEyeSlash/>)
                      }
                      </div>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <Button type='submit' className='w-full bg-darker-turquoise hover:bg-turquoise'>
                {
                  isLoading ? (
                    <>
                    <Loader2 className='m-2 h-4 w-4 animate-spin '/> Please wait
                    </>
                  ) : ("Sign-in")
                }
                </Button>

            </form>
        </Form>
        <div className='mt-4'>
          <p className='text-sm text-center mb-2 text-gray-700'>
          Do not have an account?
          </p>
            <Link href="sign-up" >
            <Button type='submit' 
            className='w-full bg-transparent hover:bg-lighter-green-2 border
             border-darker-turquoise mb-24 text-gray-800'>
            Create account
          </Button>
            </Link>
        </div>
        </div>
    </div>
    </div>
  )
}

export default SignIn