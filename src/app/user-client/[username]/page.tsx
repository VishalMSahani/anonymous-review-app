'use client'
import { messagesSchema } from '@/schemas/messageSchema';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea"
import Link from 'next/link';
import { useCompletion } from 'ai/react';
import Image from 'next/image';
import logo from '../../../assets/Logo-true-feedback.svg'
import darkImg from '../../../assets/Email campaign-pana dark.svg'


const parseStringMessages = (messageString:string):string[]=>{
    return messageString.split('||');
}

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";



const SendMessage = () => {

    const params = useParams<{username:string}>();
    const username = params.username;

    const {
        complete,
        completion,
        isLoading: isSuggestLoading,
        error,
      } = useCompletion({
        api: '/api/suggest-messages',
        initialCompletion: initialMessageString,
      });

    const form = useForm<z.infer<typeof messagesSchema>>({
        resolver: zodResolver(messagesSchema),
    });

    const messageContent = form.watch('content');

    const handleMessageClick = (message: string) => {
        form.setValue('content', message);
    };
    
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: z.infer<typeof messagesSchema>) => {
        setIsLoading(true);
        try {
          const response = await axios.post<ApiResponse>('/api/send-message', {
            ...data,
            username,
          });
    
          toast({
            title: response.data.message,
            variant: 'default',
          });
          form.reset({ ...form.getValues(), content: '' });
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          toast({
            title: 'Error',
            description:
              axiosError.response?.data.message ?? 'Failed to sent message',
            variant: 'destructive',
          });
        } finally {
          setIsLoading(false);
        }
      };
    
    

  return (
    <div className='bg-lighter-green-0 w-full min-h-screen max-h-full'>
    <div className="container mx-auto py-8 p-6 bg-lighter-green-0 rounded max-w-4xl min-h-screen">
      <div className='flex flex-col lg:flex-row items-center lg:justify-evenly '>
        <div className='flex flex-col items-center '>
            <p className='text-center text-lg'>Welcome to </p>
            <h1 className="text-4xl font-bold mb-2 text-center">
              Public Profile of
            </h1>
            <Image src={logo} alt='Public Profile Img' width={200}/>
        </div>
          <Image src={darkImg} alt='Public Profile Img' width={350} />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6 bg-turquoise 
            p-4 rounded-md">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className=''>
                <FormLabel className='text-md'>Send Anonymous Message to 
                <span className='font-semibold'> @{username}</span></FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center ">
            {isLoading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin " />
                Please wait
              </Button>
            ) : (
              <Button className=''
              type="submit" disabled={isLoading || !messageContent}>
                Send It
              </Button>
            )}
          </div>
        </form>
      </Form>

      <div className="space-y-4 my-8">
        <div className="space-y-2 text-gray-600">
          <Button className="my-4 bg-lighter-green-4 text-gray-600 hover:bg-lighter-green-4">
            Suggested Messages
          </Button>
          <p>Click on any message below to select it.</p>
        </div>
        <Card className='bg-lighter-green-2'>
          <CardHeader>
            <h3 className="text-xl font-semibold text-darker-turquoise">Messages</h3>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            {error ? (
              <p className="text-red-500">{error.message}</p>
            ) : (
              parseStringMessages(completion).map((message, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="mb-2 bg-lighter-green-0" 
                  onClick={() => handleMessageClick(message)}
                >
                  {message}
                </Button>
              ))
            )}
          </CardContent>
        </Card>
      </div>
      <Separator className="my-6" />
      <div className="text-center">
        <div className="mb-4">Get Your Message Board</div>
        <Link href={'/sign-up'}>
          <Button className='bg-darker-turquoise hover:bg-turquoise'
          >Create Your Account</Button>
        </Link>
      </div>
    </div>
    </div>
  )
}

export default SendMessage
