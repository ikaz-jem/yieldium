import React, { useRef } from 'react'
import { GrMoney } from "react-icons/gr";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion, useInView } from 'framer-motion';
import Featuresslider from './components/Featuresslider/Featuresslider';
import FeaturesAccordion from '../components/FeaturesAccordion';
import BrandsSlider from './components/BrandsSlider/BrandsSlider';


export default function SectionFeatures() {
  const itemRef = useRef(null)
  const isInView = useInView(itemRef, { once: false })


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

      <div className="rounded-xl p-px bg-gradient-to-br from-primary/40 to-pink-500/20 from-40% /10 w-full h-full z-1">
        <div className="rounded-xl bg-background/95 p-6 bg-clip-border w-full h-full space-y-5">


          <div className='border rounded border-primary/40 w-max p-3'>
            <GrMoney className='text-primary text-xl' />
          </div>

          {/* Card content here */}
          <div className='space-y-5'>

            <h2 className="text-lg font-medium">{data?.title}</h2>
            <p className='text-sm text-neutral'>{data?.desc}</p>
          </div>
        </div>
      </div>

    )


  }


  function Section1() {
    return (
      <div className='grid gap-10  '>

        <div className='grid  w-full gap-3  ' >

          <div className='text-left gap-3 flex justify-between align-baseline '>
            <div className='space-y-3'>
              <h1 className='text-5xl tracking-widest font-bold ' >Building A Better </h1>
              <h1 className='text-5xl font-light tracking-widest !text-primary ' >Financial Future </h1>
            </div>
            <button className=' h-max cursor-pointer hover:bg-primary/10 transition-all border-primary/50 border w-max rounded-full flex items-center gap-2 px-5 py-2 '>Crypto Trading Now  <FaArrowRightLong className='text-primary ' /> </button>
          </div>
        </div>

        <div className='flex justify-between gap-5'>
          {
            cards?.map((item, key) => <Card key={key} data={item} />)
          }
        </div>

        <Featuresslider />

      </div>

    )
  }


  function Section2() {
    return (
      <div className='grid gap-5 border  rounded-xl p-10 bg-background  '>

        <div className='grid gap-5 py-5'>

          <button className='border w-max rounded-full flex items-center gap-2 px-5 py-2 border-primary/50 hover:bg-primary/10 transition-all cursor-pointer mb-10'>Crypto Trading Now  <FaArrowRightLong className='text-primary ' /> </button>
          <div className='flex gap-5 justify-between align-text-top'>
            <div className='grid gap-3 w-1/2 '>

              <h1 className='text-5xl font-tight tracking-widest ' >Building A <b className='text-accent'>Better</b>  </h1>
              <h1 className='text-5xl font-tight tracking-widest  ' >Financial Future </h1>
            </div>

            <div className='flex gap-10  w-1/2 '>
              <div className='w-full space-y-2 '>
                <h2 className="text-lg font-medium">Gradient Border Card</h2>
                <p className='text-sm '>This card has a vertical gradient border using your primary color.</p>
                <p className='!text-primary'>Learn More.</p>
              </div>

              <div className='w-full  space-y-2'>
                <h2 className="text-lg font-medium">Gradient Border Card</h2>
                <p className='text-sm '>This card has a vertical gradient border using your primary color.</p>
                <p className='!text-primary'>Learn More.</p>
              </div>
              09
            </div>
          </div>
        </div>

        <div className='w-full flex gap-5'>
          <div className=' w-1/2  '>
            <img src="/assets/images/sphere.png" alt="" className='w-[80%] drop-shadow-[20px_-20px_40px_rgba(238,102,166,0.4)] ' />
          </div>
          <div className='flex flex-col gap-5 items-start justify-start w-1/2 relative'>

            <h1 className='text-5xl font-tight tracking-widest ' >Building A Better </h1>
            <FeaturesAccordion />
          </div>
        </div>
      </div>
    )
  }





  function Section3() {
    return (
      <div className='grid gap-5 border  rounded-xl p-10   '>
        <div className='flex gap-5'>

          <div className='w-1/2'>
            <div className='bg-gradient-to-br from-neutral-900 border to-background h-80 w-full rounded-xl'>
            </div>

          </div>
          <div className='flex gap-5 w-1/2'>

            <div className='bg-gradient-to-br from-neutral-900 border to-background h-80 w-80 rounded-xl'>
            </div>
            <div className='bg-gradient-to-br from-neutral-900 border to-background h-80 w-80 rounded-xl'>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-6 gap-4'>

          <div className='col-span-4'>
            <div className='bg-gradient-to-br from-neutral-900 border to-background h-80 w-full rounded-xl'>
            </div>

          </div>
          <div className='col-span-2'>

            <div className='bg-gradient-to-br from-neutral-900 border to-background h-80 w-full rounded-xl'>
            </div>
          </div>

        </div>

      </div>
    )
  }


  return (
    <motion.div style={{
      opacity: isInView ? 1 : 0,
      transition: "all 1.5s "
    }}
      className='h-[350vh] snap-center w-full backdrop-blur relative bg-black overflow-hidden mask-t-from-90% py-20'>
      <span className="bg-purple-500 rounded-full h-[600px] w-[600px] blur-[400px] absolute -top-80 left-[35%] z-[-1] opacity-5"></span>
      <span className="bg-primary rounded-full w-[600px] h-[600px] absolute -top-10 -left-40 blur-[300px] opacity-30 ">
      </span>
      <div className='container space-y-20 pt-20 h-full' ref={itemRef} >
        <Section1 />
        <BrandsSlider />
        <Section2 />
        <Section3 />


      </div>
    </motion.div>
  )
}
