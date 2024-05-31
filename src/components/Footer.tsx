import React from 'react'
import { AiFillHeart } from "react-icons/ai";

const Footer = () => {
  return (
    <div>
       <footer className='h-auto bg-purple hover:bg-darker-purple flex flex-col justify-center items-center z-20
    font text-white gap-3 dark:bg-DarkGrey '>
      <div>
       
      </div>
        <div className='flex justify-center items-center gap-1 mb-5 sticky bottom-0 w-full' >
           Made with<AiFillHeart/>! by <span className='text-'>Vishal Sahani</span>
        </div>
    </footer>
    </div>
  )
}

export default Footer
