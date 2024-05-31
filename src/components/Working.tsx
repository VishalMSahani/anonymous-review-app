import React from 'react'
import StepsImg from '../assets/Steps.svg'
import Image from 'next/image'

const WorkingData = {
                    "description": "Follow these steps to create your first feedback link.",
                    "steps":[
                            "Create accout or login",
                            "Go to your dashboard",
                            "Copy generated 'public link'",
                            "Turn on 'Accepting messages'",
                            "Share link to recive message on 'Dashboard' "
                        ]
                    }

const Working = () => {

  return (
    <div className='py-3 bg-darker-turquoise '>
     <div className='text-center border mx-3 rounded-lg bg-turquoise py-7  border-opacity-30
     border-gray-50 lg:flex lg:flex-row lg:justify-evenly lg:items-center lg:py-16'>
        <div className='lg:w-full flex flex-col justify-center items-center'>
            
            <Image src={StepsImg} alt='steps-img' width={300}/>
        </div>
        <div className='lg:w-full'>
          <p className='text-3xl font-semibold mt-4 text-gray-900'>How It Works?</p>
          <p className='text-sm text-gray-800 '>{WorkingData.description}</p>
            <ul className='text-gray-600 w-full max-sm:mt-8'>
                <li className='bg-lighter-green-0 py-2 mx-2 rounded-xl shadow-lg my-2 
                hover:bg-darker-turquoise hover:text-black '>{WorkingData.steps[0]}</li>
                <li className='bg-lighter-green-3 py-2 mx-2 rounded-xl shadow-lg my-2 
                 hover:bg-darker-turquoise hover:text-black'>{WorkingData.steps[1]}</li>
                <li className='bg-lighter-green-2 py-2 mx-2 rounded-xl shadow-lg my-2 
                 hover:bg-darker-turquoise hover:text-black'>{WorkingData.steps[2]}</li>
                <li className='bg-lighter-green-1 py-2 mx-2 rounded-xl shadow-lg my-2 
                 hover:bg-darker-turquoise hover:text-black'>{WorkingData.steps[3]}</li>
                <li className='bg-light-green py-2 mx-2 rounded-xl shadow-lg my-2
                 hover:bg-darker-turquoise hover:text-black '>{WorkingData.steps[4]}</li>
            </ul>
        </div>
     </div>
    </div>
  )
}

export default Working
