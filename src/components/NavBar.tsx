'use client'
import React from 'react'
import { useSession , signOut } from 'next-auth/react'
import { User } from 'next-auth'
import Link from 'next/link'
import { Button } from './ui/button'
import logo from '../assets/Logo-true-feedback.svg'
import Image from 'next/image'


const NavBar = () => {

    const {data:session} = useSession()
    const user:User = session?.user as User

  return (
   <nav>
        <div className='flex justify-between lg:mx-24 mx-6 items-center bg-white'>
            <a href="/">
                <Image src={logo} alt='logo-trueFeedback' width={150} height={50} />   
            </a>
            {
                session? (
                    <div className='flex space-x-4'>
                    
                        <Link href='/dashboard'>
                            <Button className='bg-turquoise hover:bg-darker-turquoise text-black'>
                                Dashboard
                            </Button>
                        </Link>
                    
                    <Button className='bg-transparent border text-red-500 border-red-500 hover:bg-lighter-green-2'
                    onClick={()=>signOut()}>
                    Logout
                   </Button>
                    </div>
                ) : 
                (
                  <div className='flex space-x-2'>
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
                )
            }
        </div>
   </nav>
  )
}

export default NavBar
