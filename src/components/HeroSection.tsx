'use client'
import React from 'react'
import HeroGifgreen from '../assets/Feedback-hero-green.svg'
import HeroGifpurple from '../assets/Feedback-hero-purple.svg'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { User } from 'next-auth'
import Link from 'next/link'
import { Button } from './ui/button'


const HeroSection = () => {

    const {data:session} = useSession()
    const user:User = session?.user as User

  return (
    <div className='w-full h-full bg-lighter-green-3 text-gray-800'>
      <div className='flex flex-col justify-center '>
        <div className='flex lg:flex-row max-sm:flex-col justify-evenly  items-center'>
            <div className='mt-20 max-sm:text-center '>
                {
                    session ? (
                        <p className=''>Hello, <span className='font-semibold '>{user?.username} </span> welcome to</p>
                    ) : (
                        null
                    )
                }
                <h1 className='text-5xl font-bold mt-4' >True Feedback</h1>
                <h1 className='text-lg max-sm:text-wrap max-sm:m-2 ' >Honest and Anonymous Communication, Simplified</h1>
            </div>
            <Image className='mt-24'
            src={HeroGifgreen} alt='hero-gif' width={350} loading='lazy'/>
        </div>
        <div className='flex justify-evenly items-center mt-6 bg-lighter-green-1 pb-20'>
            {
                session ? (
                  <div className='flex flex-col justify-center items-center mt-8 gap-4'>
                    <div className='text-center gap-4'>
                            <p className='text-2xl font-semibold mb-4'>
                            Your Gateway to Honest Insights
                            </p>
                            <p className='max-w-[900px] text-s font-light'>
                            You are all set to receive anonymous feedback. Click below to access your dashboard, generate new links, and manage your messages.
                            </p>
                        </div>
                      <div>    
                    <Link href='/dashboard'>
                        <Button className='bg-turquoise hover:bg-darker-turquoise text-black'>
                            Dashboard
                        </Button>
                    </Link>
                    </div> 
                  </div>
                ):
                (
                    <div className='flex flex-col justify-center items-center mt-8 gap-4'>
                        <div className='text-center gap-4'>
                            <p className='text-3xl font-semibold mb-4'>
                            Get Started Today!
                            </p>
                            <p className='max-w-[900px] text-s font-light text-sm m-3'>
                            Empower yourself with candid feedback and genuine messages. With True Feedback, generate a unique link, 
                            share it with anyone, and receive honest, anonymous responses without revealing your identity.
                            </p>
                        </div>
                        <div>
                            <Link href='/sign-in' className='mr-4'>
                                <Button className='bg-transparent border text-black border-turquoise hover:bg-lighter-green-2'>
                                    Login
                                </Button>
                            </Link> 
                            <Link href='/sign-up'>
                                <Button className='bg-turquoise hover:bg-darker-turquoise text-black'>
                                    Sign-up
                                </Button>
                            </Link> 
                        </div>
                  </div>   
                )
            }
            
        </div>
      </div>
    </div>
  )
}

export default HeroSection
