'use client'
import React from 'react'
import { useSession , signOut } from 'next-auth/react'
import { User } from 'next-auth'
import Link from 'next/link'
import { Button } from './ui/button'


const NavBar = () => {

    const {data:session} = useSession()
    const user:User = session?.user as User

  return (
   <nav>
        <div>
            <a href="#">Mystery Message</a>
            {
                session? (
                    <>
                    <span>
                        Welcome, {user?.username}
                    </span>
                    <Button onClick={()=>signOut()}>
                    Logout
                   </Button>
                    </>
                ) : 
                (
                   <Link href='/sign-in'>
                    <Button>
                        Login
                    </Button>
                   </Link>    
                )
            }
        </div>
   </nav>
  )
}

export default NavBar
