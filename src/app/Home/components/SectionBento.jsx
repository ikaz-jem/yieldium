
import React from 'react'

import { AiFillOpenAI } from "react-icons/ai";
import ButtonPrimary from '@/app/components/ButtonPrimary';
import { LazyMotion, domAnimation, m } from "framer-motion";


function Bento() {
  return (
    <div className='grid gap-5  relative pr-2 pl-1'>

      <div className='flex flex-col md:flex-row gap-5 '>
          <div className='w-full relative group/1 !overflow-hidden'>            
            <div className='cursor-pointer p-5    bg-white/5  h-60 w-full rounded-xl overflow-hidden'>


              <div className='grid gap-5 z-10'>
                <div className='flex gap-2 items-center z-10'>
                  <AiFillOpenAI className='text-primary text-3xl z-10' />
                  <h5 className='z-10'>Artificial Automated Strategy</h5>
                </div>
                <p className='w-[80%] z-10'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate</p>
                <ButtonPrimary className='!text-xs'>Start Using!</ButtonPrimary>
              </div>
            </div>
          </div>


        <div className='flex gap-5 w-full'>


          <div className=' relative  overflow-hidden  cursor-pointer p-5   bg-white/5  h-60 w-full rounded-xl  '>
            <div className='grid gap-5 z-10  transition duration-1000  '>
              <div className='flex gap-2  items-center z-10'>
                <AiFillOpenAI className='text-primary text-3xl z-10' />
                <h5 className='font-semibold   z-10'>Artificial Automated Strategy</h5>
              </div>
              <p className=' w-[80%] z-10'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem .</p>
            </div>
          </div>

          <div className='  cursor-pointer p-5   bg-white/5  h-60 w-full rounded-xl  '>
            <div className='grid gap-5 z-10  transition duration-1000  '>
              <div className='flex gap-2  items-center z-10'>
                <AiFillOpenAI className='text-primary text-3xl z-10' />
                <h5 className='font-semibold   z-10'>Artificial Automated Strategy</h5>
              </div>
              <p className=' w-[80%] z-10'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem .</p>
            </div>
          </div>
        </div>



      </div>
      <div className='grid grid-cols-6 gap-4'>

        <div className='col-span-3 md:col-span-4'>

          <div className='  cursor-pointer p-5   bg-white/5  h-60 w-full rounded-xl  '>
            <div className='grid gap-5 z-10  transition duration-1000  '>
              <div className='flex gap-2  items-center z-10'>
                <AiFillOpenAI className='text-primary text-3xl z-10' />
                <h5 className='font-semibold   z-10'>Artificial Automated Strategy</h5>
              </div>
              <p className=' w-[80%] z-10'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem .</p>
            </div>
          </div>


        </div>
        <div className='col-span-3 md:col-span-2'>

          <div className='  cursor-pointer p-5   bg-white/5  h-60 w-full rounded-xl  '>
            <div className='grid gap-5 z-10  transition duration-1000  '>
              <div className='flex gap-2  items-center z-10'>
                <AiFillOpenAI className='text-primary text-3xl z-10' />
                <h5 className='font-semibold   z-10'>Artificial Automated Strategy</h5>
              </div>
              <p className=' w-[80%] z-10'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem .</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}



export default function SectionBento() {
  return (
    <>

      <div
        className='h-[100vh]  overflow-y-scroll md:overflow-y-none  w-full   relative overflow-hidden bg-black '>
        {/* <div
          class="opacity-80 sepia-20   mask-radial-from-0% group-hover/1:blur-xs  z-0 absolute inset-0 bg-[url('/assets/images/wave.png')] bg-cover  ">
        </div> */}
     
     
        <div className='  '>

          <div className='container space-y-20 py-20 h-full'  >
            <LazyMotion features={domAnimation}>

              <div className='px-2'>
                <m.h1 className='text-3xl lg:text-5xl tracking-widest font-bold'>
                  Building A Better
                </m.h1>
                <m.h1 className='text-3xl lg:text-5xl font-light tracking-widest !text-primary'>
                  Financial Future
                </m.h1>
              </div>
            </LazyMotion >

            <Bento />
          </div>
        </div>
      </div>
    </>
  )


}
