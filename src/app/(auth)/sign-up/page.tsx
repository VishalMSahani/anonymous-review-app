'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import {useForm } from 'react-hook-form'
import * as z from 'zod'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useToast } from "@/components/ui/use-toast"
import { useDebounceCallback } from 'usehooks-ts'
import { useRouter } from 'next/navigation'
import { signUpSchema } from '@/schemas/signUpSchema'
import axios, {AxiosError} from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { Form,
         FormControl,
         FormDescription, 
         FormField, 
         FormItem, 
         FormLabel, 
         FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import SignupImg from '../../../assets/Sign up-amico.svg'
import Image from 'next/image'



const Page = ()=> {

    const [username, setUsername] = useState("");
    const [usernameMessage, setUsernameMessage] = useState("")
    const [isCheckingUsername, setIsCheckingUsername] = useState(false)
    const [isSubmetting, setIsSubmetting] = useState(false)
    const debounced = useDebounceCallback(setUsername, 300)
    const { toast } = useToast()
    const router = useRouter()


    const form = useForm<z.infer<typeof signUpSchema>>({
      resolver:zodResolver(signUpSchema),
      defaultValues:{
        username: '',
        email: '',
        password: ''
      }
    })

    useEffect( () => {
      const checkUsernameUnique = async() =>{
        if (username) {  
          setIsCheckingUsername(true)
          setUsernameMessage("")
  
          try {
            const response = await axios.get(`/api/check-username-unique?username=${username}`)
            setUsernameMessage(response.data.message)
  
          } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            setUsernameMessage(axiosError.response?.data.message ?? "Error checking username")
          }
          finally{
            setIsCheckingUsername(false)
          }
        }
      }
    checkUsernameUnique()
    }, [username ])

    const onSubmit = async(data: z.infer<typeof signUpSchema>) => {
      setIsSubmetting(true)

      try {
        const response = await axios.post<ApiResponse>('/api/sign-up', data)
        toast({
          title: 'Success', 
          description: response.data.message
        })
        router.replace(`verify/${username}`)
        setIsSubmetting(false)
      } catch (error) {
        console.error("error while siging-up", error)
        const axiosError = error as AxiosError<ApiResponse>;
        let errorMessage = axiosError.response?.data.message 
        toast({
          title:"Sign-up failed", 
          description: errorMessage, 
          variant:'destructive'
        })
        setIsSubmetting(false)
      }

    }

  return (
    <div className=' flex justify-center items-center flex-col bg-lighter-green-1 h-full lg:flex-row lg:px-40'> 
      <div className='my-8 text-center text-gray-700 flex flex-col justify-center items-center w-full lg:mt-8'>
        <p className='text-3xl font-bold my-3 text-darker-turquoise'>Join True Feedback Today!</p>
        <p className='text-[25px] font-semibold'>Create Your Account</p>
        <p className='text-[15px] mb-5'>Sign up to start receiving feedback and insights.</p>
        <Image src={SignupImg} alt='sign-up-Img' width={300}/>
      </div>
      <div className='lg:w-full'>
        <Form {...form}>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder=" Please enter username" className='bg-lighter-green-0'
                {...field}
                onChange={(e)=>{
                  field.onChange(e)
                  debounced(e.target.value)
                }} />
              </FormControl>
              {isCheckingUsername && <Loader2 className='m-2 h-4 w-4 animate-spin '/>}
              <p className={`text-sm ${usernameMessage === "Username is unique" ?
               ("text-green-500"):("text-red-500")}`}>
                {usernameMessage}
              </p>
              <FormDescription>
                This username will be your public display username.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Please enter email" className='bg-lighter-green-0'
                {...field}
                 />
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
                <Input type='password' placeholder="password" className='bg-lighter-green-0'
                {...field}
                 />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

          <Button type='submit' disabled={isSubmetting} 
          className='w-full bg-darker-turquoise hover:bg-turquoise'>
            {
              isSubmetting ? (
                <>
                <Loader2 className='m-2 h-4 w-4 animate-spin '/> Pleasr wait
                </>
              ) : ("Sign-up")
            }
          </Button>
      </form>
        </Form>
        <div className='mt-4'>
          <p className='text-sm text-center mb-2 text-gray-700'>
          Already have an account?
          </p>
            <Link href="sign-in" >
            <Button type='submit' 
            className='w-full bg-transparent hover:bg-lighter-green-2 border
             border-darker-turquoise mb-24 text-gray-800'>
            Sign-in
          </Button>
            </Link>
        </div>

      </div>
    </div>
  ) 
}

export default Page