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

const Dashboard = () => {

    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    const [isSwitchoading, setIsSwitchoading] = useState(false)
    const {toast} = useToast()

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
            setValue('acceptMessages', response.data.isAcceptingMessage);
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
                title: 'Error',
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
        return <div></div>
    };

    const {username} = session.user as User;

    const baseURL = `${window.location.protocol}//${window.location.host}`
    const profileURL = `${baseURL}/user-client/${username}`

    const coypToClipboard = () =>{
        navigator.clipboard.writeText(profileURL);
        toast({
            title: 'URL Copied!',
            description: 'Profile URL has been copied to clipboard.',
          });
    }

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
    <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{' '}
      <div className="flex items-center">
        <input
          type="text"
          value={profileURL}
          disabled
          className="input input-bordered w-full p-2 mr-2"
        />
        <Button onClick={coypToClipboard}>Copy</Button>
      </div>
    </div>

    <div className="mb-4">
        <Switch
          {...register('acceptMessages')}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchoading}
        />
        <span className="ml-2">
          Accept Messages: {acceptMessages ? 'On' : 'Off'}
        </span>
      </div>
      <Separator />

      <Button
        className="mt-4"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />

        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
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
          <p>No messages to display.</p>
        )}
      </div>
    </div>
  )
}   

export default Dashboard
