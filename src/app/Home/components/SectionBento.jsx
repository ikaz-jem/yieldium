
import React from 'react'

import { motion } from "framer-motion"
import { AiFillOpenAI } from "react-icons/ai";
import ButtonPrimary from '@/app/components/ButtonPrimary';


function Bento() {
  return (
    <div className='grid gap-5  relative pr-2 pl-1'>
      <span className="bg-primary rounded-full h-[600px] w-[600px] blur-[400px] absolute -top-80 left-[35%] z-[-1] opacity-40"></span>



      <div className='flex flex-col md:flex-row gap-5 '>

        <span className="bg-primary rounded-full h-[250px] w-[50px] blur-[40px] absolute bottom-0 right-0 z-[-1] opacity-80"></span>

        <div className='w-full relative group/1 !overflow-hidden'>
          <motion.div
            className='w-full relative group/1 !overflow-hidden'
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: false }}
          >
            <div className='cursor-pointer p-5 backdrop-blur-lg border border-white/10 bg-white/5 hover:border-primary/20 h-60 w-full rounded-xl overflow-hidden'>
              <span className="bg-primary rounded-full h-[150px] w-[50px] blur-[40px] absolute bottom-0 right-0 z-[-1] opacity-80"></span>
              <span className="bg-primary rounded-full h-[150px] w-[150px] blur-[80px] absolute top-0 -left-10 z-[-1] opacity-80 group-hover/1:blur-[100px] transition-all duration-1000 animate-pulse"></span>

              <div className='grid gap-5 z-10'>
                <div className='flex gap-2 items-center z-10'>
                  <AiFillOpenAI className='text-primary text-3xl z-10' />
                  <h5 className='z-10'>Artificial Automated Strategy</h5>
                </div>
                <p className='w-[80%] z-10'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem.</p>
                <ButtonPrimary className='!text-xs'>Start Using!</ButtonPrimary>
              </div>
            </div>
          </motion.div>
        </div>


        <div className='flex gap-5 w-full'>


          <div className=' relative  overflow-hidden cursor-pointer p-5 backdrop-blur-lg border border-white/10 bg-white/5 hover:border-primary/20 h-60 w-full rounded-xl  '>
            <div className='grid gap-5 z-10  transition duration-1000  '>
              <div className='flex gap-2  items-center z-10'>
                <AiFillOpenAI className='text-primary text-3xl z-10' />
                <h5 className='font-semibold   z-10'>Artificial Automated Strategy</h5>
              </div>
              <p className=' w-[80%] z-10'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem .</p>
            </div>
          </div>

          <div className=' relative  overflow-hidden cursor-pointer p-5 backdrop-blur-lg border border-white/10 bg-white/5 hover:border-primary/20 h-60 w-full rounded-xl  '>
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

          <div className=' relative  overflow-hidden cursor-pointer p-5 backdrop-blur-lg border border-white/10 bg-white/5 hover:border-primary/20 h-60 w-full rounded-xl  '>
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

          <div className=' relative  overflow-hidden cursor-pointer p-5 backdrop-blur-lg border border-white/10 bg-white/5 hover:border-primary/20 h-60 w-full rounded-xl  '>
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
        className='h-[100vh] overflow-y-scroll md:overflow-y-none snap-center w-full backdrop-blur  relative overflow-hidden bg-black '>
        <div
          class="opacity-80 sepia-20   mask-radial-from-0% group-hover/1:blur-xs  z-0 absolute inset-0 bg-[url('/assets/images/wave.png')] bg-cover bg-clip-content transition-transform duration-500 group-hover:scale-110">
        </div>
        <span className="bg-purple-500 rounded-full h-[600px] w-[600px] blur-[400px] absolute -top-80 left-[35%] z-[-1] opacity-5"></span>
        <span className="bg-primary rounded-full w-[600px] h-[600px] absolute -top-10 -left-40 blur-[300px] opacity-30 ">
        </span>
        <div className='  '>

          <div className='container space-y-20 py-20 h-full'  >

          <motion.div
  className='space-y-3'
  initial={{ opacity: 0, x: -30 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
  viewport={{ once: true }}
>
  <motion.h1 className='text-5xl tracking-widest font-bold'>
    Building A Better
  </motion.h1>
  <motion.h1 className='text-5xl font-light tracking-widest !text-primary'>
    Financial Future
  </motion.h1>
</motion.div>

            <Bento />
          </div>
        </div>
      </div>
    </>
  )


}
