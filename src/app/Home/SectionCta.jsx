import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from 'framer-motion'
function Card2({ data }) {

    return (
        <div className="rounded-xl p-5 bg-gradient-to-br from-primary/40 to-pink-500/50 from-40% /10 w-full h-max z-1">
            <div className="rounded-xl bg-background flex justify-end bg-clip-border w-full h-full relative bg-gradient-to-tr from-background to-neutral-900 ">
                <motion.img initial={{y:50 ,opacity:0}} whileInView={{y:0 ,opacity:1}} viewport={{once:false}}  transition={{ duration: 0.6, ease: 'easeOut' }} src="/assets/images/mobile.png" alt="" className='absolute bottom-0 left-0 drop-shadow-[0px_-20px_40px_rgba(238,102,166,0.3)] ' />
                <div className='text-left gap-3 flex justify-between align-baseline p-10 my-5'>
                    <div className=''>
                        <h1 className='text-4xl tracking-widest font-bold !text-neutral ' >Yieldium ,Your Growth  </h1>
                        <h1 className='text-2xl font-light tracking-widest !text-primary ' >Your Pocket Financial Companion ! </h1>
                        <p className=' tracking-widest  max-w-md !text-neutral py-5 ' >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scra </p>
                    </div>
                </div>
            </div>
        </div>
    )
}




export default function SectionCta() {
    return (
        <div className='pr-2 pl-1 overflow-y-scroll md:overflow-y-hidden snap-center w-full backdrop-blur relative bg-gradient-to-b from-background to-black overflow-hidden py-10 pt-20 h-[100vh]'>

            <span className="bg-pink-500 rounded-full h-[600px] w-[600px] blur-[400px] absolute top-[80] left-[35%] z-[-1] opacity-40"></span>
            <span className="bg-primary rounded-full w-[600px] h-[600px] absolute top-[50%] -left-40 blur-[300px] opacity-30 "></span>

            <div className='container   h-full space-y-20'  >


                <div className='text-left gap-3 flex flex-col md:flex-row justify-between align-baseline '>
                    <motion.div
                        className='space-y-3'
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        viewport={{ once: false }}
                    >
                        <motion.h1 className='text-5xl tracking-widest font-bold'>
                            Building A Better
                        </motion.h1>
                        <motion.h1 className='text-5xl font-light tracking-widest !text-primary'>
                            Financial Future
                        </motion.h1>
                    </motion.div>
                    <button className=' h-max cursor-pointer hover:bg-primary/10 transition-all border-primary/50 border w-max rounded-full flex items-center gap-2 px-5 py-2 '>Crypto Trading Now  <FaArrowRightLong className='text-primary ' /> </button>
                </div>



                <div className='pt-10'>
                    <Card2 />
                </div>
                <p className=' tracking-widest text-center  !text-neutral ' >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scra </p>
            </div>
        </div>
    )
}
