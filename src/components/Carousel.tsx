'use client'
import React from 'react'
import messages from '../message.json'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ArrowBigRightDashIcon } from 'lucide-react'
import Img from '../assets/Innovation-pana.svg'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'

const CarouselHome = () => {
  return (
    
    <div className='flex-grow flex flex-col md:flex-row lg:space-x-6 gap-16 
     items-center justify-center px-4 md:px-24 py-16 bg-lighter-green-0 text-lighter-green-3'>
      
      <div className='w-full max-w-lg md:max-w-xl   max-md:order-2'>
      <p className='text-3xl max-md:text-center text-gray-800 font-semibold'>Features</p>
      <p className='text-sm max-md:text-center text-gray-800 mb-6'>Explore the features of True Feedback</p>

      <Carousel
          plugins={[Autoplay({ delay: 3000 })]}
          className="w-full max-w-lg md:max-w-xl max-md:order-2"
        >
      
          <CarouselContent >
            {messages.map((message, index) => (
              <CarouselItem key={index} className=" ">
                <Card className='bg-turquoise'>
                  <CardHeader>
                    <CardTitle>{message.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                    <div >
                      <div className='flex text-sm'>
                      <ArrowBigRightDashIcon className="flex-shrink-0" />
                        <p>{message.text}</p>
                      </div>
                      <div >
                      <p className="text-xs  mt-6 text-lighter-green-3 opacity-80">
                        {message.tag}
                      </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='bg-lighter-green-3 text-darker-turquoise hover:bg-turquoise hover:text-lighter-green-1'/>
          <CarouselNext className='bg-lighter-green-3 text-darker-turquoise hover:bg-turquoise hover:text-lighter-green-1'/>
        </Carousel>
        </div>
        <div className='max-md:order-1 text-center'>
            
            <Image src={Img} alt='img' width={300}/>
        </div>
    </div>
  )
}

export default CarouselHome
