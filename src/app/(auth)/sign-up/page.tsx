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
    <div className=' flex justify-center items-center '> 
      <div className=''>
        <Form {...form}>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" 
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
                <Input placeholder="email" 
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
                <Input type='password' placeholder="password" 
                {...field}
                 />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

          <Button type='submit' disabled={isSubmetting}>
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
        <div>
          <p>
            have account ?

            <Link href="sign-in" >
            Sign-in</Link>
          </p>
        </div>
      </div>
    </div>
  ) 
}

export default Page