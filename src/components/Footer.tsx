'use client'
import React from 'react'
import { AiFillHeart } from "react-icons/ai";
import { Separator } from './ui/separator';
import { FaGithub } from 'react-icons/fa';
import { Code } from 'lucide-react';
import Image from 'next/image';
import Profile from '../assets/Vishal Image.svg'
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Footer = () => {

  const {data:session} = useSession()

  return (
    <div>
       <footer className='h-auto bg-gray-900 flex flex-col justify-center items-center z-20
    font  gap-3 dark:bg-DarkGrey text-gray-400'>
      <div className='mt-4 flex gap-6'>
       <Link href={'/'}>Home</Link>
       {
        session? (
          <Link href={'/dashboard'}>Dashboard</Link>
        ) : (
          <div className='space-x-6'>
            <Link href={'/sign-up'}>Sign-up</Link>
            <Link href={'/sign-in'}>Sign-in</Link>
          </div>
        )
       }
       
      </div>
      <Separator className='opacity-30'/>
        <div className='flex gap-2 max-md:flex-wrap max-md:items-center justify-center'>
          <a href="https://github.com/VishalMSahani/anonymous-review-app" className='flex items-center justify-center gap-2 
          border-opacity-40 border p-1 px-2 rounded-md border-gray-300 hover:bg-darker-purple'>
          <Code/> Source Code 
          </a>
          <a href="https://github.com/VishalMSahani/" className='flex items-center justify-center gap-2 
          border-opacity-40 border p-1 px-2 rounded-md border-gray-300 hover:bg-darker-purple'>
          <FaGithub/> GitHub 
          </a>
          <a href="https://vishal-portfolio-phi.vercel.app/" className='flex items-center justify-center gap-2 
          border-opacity-40 border p-1 px-2 rounded-md border-gray-300 hover:bg-darker-purple'>
          <Image src={Profile} alt='profile Img' width={40}/> Portfolio - Vishal 
          </a>
        </div>
        
        <div className='flex justify-center items-center gap-1 mb-5 sticky bottom-0 w-full' >
           Made with<AiFillHeart/>! by <span className='font-semibold underline'>
            <a href="https://vishal-portfolio-phi.vercel.app/">Vishal Sahani </a>
           </span>
        </div>
    </footer>
    </div>
  )
}

export default Footer
