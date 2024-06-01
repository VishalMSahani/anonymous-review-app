'use client'
import React from 'react'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    } from "@/components/ui/alert-dialog"
import { Button } from './ui/button'
import { DeleteIcon } from 'lucide-react'
import { Message } from '@/models/User'
import axios, { AxiosError } from 'axios'
import { useToast } from './ui/use-toast'
import dayjs from 'dayjs'
import { ApiResponse } from '@/types/ApiResponse'



type MessageCardProps ={
    message:Message;
    onMessageDelete: (messageId:string)=> void
}

const MessageCard = ({message , onMessageDelete}:MessageCardProps) => {
    
    const {toast} = useToast()
    
    const hendelDeleteConfirm = async() =>{
        try {
            const response = await axios.delete<ApiResponse>(`/api/delete-message/ ${message._id}`)
            toast({
                title:response.data.message
            })
            onMessageDelete(message._id)
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
                title:'error',
                description: axiosError.response?.data.message ?? 'failed to delete message',
                variant: 'destructive'
            })
        }
    }
  return (
    <div className=''>
        <Card className='card-bordered'>
            <CardHeader>
                <div className='flex justify-between items-center'>
                <CardTitle className='text-lg font-semibold'
                >{message.content}</CardTitle>
                <AlertDialog>
                    <AlertDialogTrigger asChild className=''>
                        <Button variant="destructive" className='px-2 py-1'><DeleteIcon className='w-5 h-5'/></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            <span className='font-semibold italic'> Message </span> 
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={hendelDeleteConfirm}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                    </AlertDialog>
                </div>
                <CardDescription className='text-sm text-gray-500'>
                    {dayjs(message.createdAt).format('MMM D, YYYY h:mm A')}
                </CardDescription>
            </CardHeader>
            
        </Card>
    </div>
  )
}

export default MessageCard
