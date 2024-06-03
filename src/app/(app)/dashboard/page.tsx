'use client'
import MessageCard from '@/components/MessageCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Message } from '@/models/User'
import { acceptMessageSchema } from '@/schemas/acceptMessageSchema';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import axios, { AxiosError } from 'axios';
import { Loader2, RefreshCcw } from 'lucide-react';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import DashBoardImg from '../../../assets/Analyze-pana.svg'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Dashboard = () => {

    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isSwitchoading, setIsSwitchoading] = useState(false);
    const [buttonText, setButtonText] = useState('Copy');
    const {toast} = useToast();
    const router = useRouter();

    const handleMessageDelete = (messageId:string) => {
        setMessages(messages.filter( (message) => message._id ==! messageId))
    };

    const {data:session} = useSession();

    const form = useForm({
        resolver: zodResolver(acceptMessageSchema)
    })

    const {register, watch, setValue} = form;
    const acceptMessages = watch('acceptMessages');

    const fetchAcceptMessage = useCallback(async() => {
        setIsSwitchoading(true)
        try {
            const response = await axios.get<ApiResponse>('api/accept-message');
            setValue('acceptMessages', response.data.isAcceptingMessages);
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
                title: 'Error',
                description:
                axiosError.response?.data.message ??
                'Failed to fetch message settings',
                variant: 'destructive',    
            })
        }
        finally{
            setIsSwitchoading(false)
        }
    }, [setValue, toast])

    const fetchMessages = useCallback(async(refresh: boolean = false)=>{
        setIsLoading(true);
        setIsSwitchoading(false);

        try {
            const response = await axios.get<ApiResponse>('/api/get-messages');
            setMessages(response.data.messages || [])
            if (refresh) {
                toast({
                  title: 'Refreshed Messages',
                  description: 'Showing latest messages',
                });
            }
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
                title: 'No Message',
                description:
                axiosError.response?.data.message ??
                'Failed to fetch message settings',
                variant: 'destructive',    
            })
        }
        finally{
            setIsLoading(false);
            setIsSwitchoading(false);
        }
    }, [setIsLoading , setMessages, toast]) 

    // fetch initial state from the server

    useEffect(()=>{
      // if (!session || !session.user){
      //   router.push('/sign-up')
      // };
        fetchMessages();
        fetchAcceptMessage();
    },[session, setValue, toast, fetchMessages, fetchAcceptMessage]);

    const handleSwitchChange = async() => {
        try {
            const response = await axios.post<ApiResponse>('api/accept-message', {
                acceptMessages: !acceptMessages,
            });
            setValue('acceptMessages', !acceptMessages);
            toast({
                title: response.data.message, 
                variant:'default'
            })
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
                toast({
                    title: 'Error',
                    description:
                    axiosError.response?.data.message ??
                    'Failed to update message settings',
                    variant: 'destructive',
                }
            );
        }
    } 
    
    if (!session || !session.user) {
      // router.replace('/')
      return <div className='h-screen'>Sign-up first </div>;
    }

    const {username} = session.user as User;

    const baseURL = `${window.location.protocol}//${window.location.host}`
    const profileURL = `${baseURL}/user-client/${username}`

    const copyToClipboard = () => {
      if (!navigator.clipboard) {
          // console.error('Clipboard API not available');
          toast({
              title: 'Copy Failed',
              description: 'Clipboard API not available.',
              variant: 'destructive'
          });
          return;
      }
  
      navigator.clipboard.writeText(profileURL).then(() => {
          toast({
              title: 'URL Copied!',
              description: 'Profile URL has been copied to clipboard.',
          });
          setButtonText('Copied!');
          setTimeout(() => setButtonText('Copy'), 2000);
      }).catch(err => {
          console.error('Failed to copy: ', err);
          toast({
              title: 'Copy Failed',
              description: 'Failed to copy profile URL to clipboard.',
              variant: 'destructive'
          });
      });
  }

  return (
    <div className='bg-lighter-green-0 min-h-screen max-h-full w-full'>
    <div className="my-8 md:mx-8 lg:mx-auto p-6 bg-lighter-green-0 rounded w-full max-w-6xl 
                    min-h-screen max-h-full mt-3">
      <div className='flex lg:items-center justify-between max-md:flex-col '>
        <div>
          <p className='text-2xl font-semibold text-gray-600'>Hello, <span className='italic'>{username} </span></p>
          <p className='text-sm text-gray-500'>Welcome to </p>
          <h1 className="text-4xl font-bold mb-4 mt-3 text-darker-turquoise">User Dashboard</h1>
        </div>
        <Image src={DashBoardImg} alt='DashBoardImage' width={350} className='lg:mr-24 max-md:ml-5'/>
      </div>

    <div className="mb-4 bg-lighter-green-1 p-5 rounded-lg">
      <h2 className="text-lg font-semibold mb-1 text-gray-700">Copy Your Unique Link</h2>{' '}
      <p className='mb-3 text-sm'>Share this link to recive messages </p>
      <div className="flex items-center">
        <input
          type="text"
          value={profileURL}
          disabled
          className={`w-full p-2 mr-2 bg-gray-100 rounded-md 
          ${buttonText === "Copied!" ? "bg-lighter-green-4": null}`}
        />
        <Button type='submit' onClick={copyToClipboard}>
          {buttonText}
        </Button>
      </div>
    </div>

    <div className="mb-4 flex items-center ">
        <Switch
          {...register('acceptMessages')}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchoading}
        />
        <span className="ml-2 ">
          Accept Messages: {acceptMessages ? 'On' : 'Off'}
        </span>
      </div>
      <Separator />

      <Button

        className="mt-4 bg-turquoise hover:bg-darker-turquoise hover:text-white"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-white" />

        ) : (
          <RefreshCcw className="h-4 w-4 text-white" />
        )} 
        <p className='ml-3'> 
        <span>
          {
            isLoading ? "Refreshing" : "Refresh" 
          }
          </span> Messages</p>
      </Button>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <MessageCard
              key={message._id}
              message={message}
              onMessageDelete={handleMessageDelete}
            />
          ))
        ) : (
          <p> No messages to display.</p>
        )}
      </div>
    </div>
    </div>
  )
}   

export default Dashboard
