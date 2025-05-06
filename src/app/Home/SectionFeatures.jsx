import React, { useRef } from 'react'
import { GrMoney } from "react-icons/gr";
import { FaArrowRightLong } from "react-icons/fa6";
import Featuresslider from './components/Featuresslider/Featuresslider';


import { LazyMotion, domAnimation, m } from "framer-motion";


export default function SectionFeatures() {
  const itemRef = useRef(null)

  

  const cards = [
    {
      title: 'Where Knowledge Meets Opportunity',
      desc: 'Lorem ipsum dolor sit amet, consectur adipiscing elit, sed do eiusmod tempor ',
    },
    {
      title: 'Connecting You to Financial Opportunities',
      desc: 'Lorem ipsum dolor sit amet, consectur adipiscing elit, sed do eiusmod tempor ',
    },
    {
      title: 'Our Mission: Empowering Your Investments',
      desc: 'Lorem ipsum dolor sit amet, consectur adipiscing elit, sed do eiusmod tempor ',
    },
  ]

  function Card({ data }) {
    return (

      <div className="rounded-xl h-full bg-white/5 border border-primary/5 shadow-xl  p-6 bg-clip-border w-full space-y-5">


        <div className='border rounded border-primary/50 w-max p-3'>
          <GrMoney className='text-primary/50 text-xl' />
        </div>

        <div className='space-y-5'>

          <h2 className="text-lg font-medium">{data?.title}</h2>
          <p className='text-sm text-neutral'>{data?.desc}</p>
        </div>
      </div>

    )


  }


  function Section1() {
    return (
      <div className='grid gap-10  '>

        <div className='grid  w-full gap-3  ' >

          <div className='text-left gap-3 flex flex-col md:flex-row justify-between align-baseline '>
            <div className='space-y-3'>
              <h1 className='text-3xl lg:text-5xl tracking-widest font-bold ' >Building A Better </h1>
              <h1 className='text-3xl lg:text-5xl font-light tracking-widest !text-primary ' >Financial Future </h1>
            </div>
            <button className=' h-max cursor-pointer hover:bg-primary/10 transition-all border-primary/50 border w-max rounded-full flex items-center gap-2 px-5 py-2 '>Crypto Trading Now  <FaArrowRightLong className='text-primary ' /> </button>
          </div>
        </div>

        <div className='grid gap-5 grid-cols-1 lg:grid-cols-3'>
          {
            cards?.map((item, key) => <Card key={key} data={item} />)
          }
        </div>
      </div>

    )
  }

  



  return (
    
    <div className='h-[100vh] relative overflow-y-scroll sm:overflow-none  '>
      <img src="/assets/images/divider.png" loading='lazy' alt="" className="w-full -mb-[100px] md:-mb-[200px] lg:-mb-[450px] z-[-1] " />
      <LazyMotion features={domAnimation}>
      <m.div 
      initial={{opacity:0}}
      whileInView={{opacity:1}}
      viewport={{once:false}}
      className=' w-full backdrop-blur  overflow-hidden   relative'>

  
        <div className='bg-black  mask-t-from-90%  pr-2 pl-1 '>
          <div className='container space-y-20 py-20 h-full' ref={itemRef} >
            <div>
              <Section1 />
            </div>
            <div className='w-full h-[39px] bg-black hidden md:flex'>

            </div>
          </div>
        </div>
      </m.div>
    </LazyMotion >
    </div>

  )
}
