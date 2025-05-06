import React, { useRef } from 'react'
import { GrMoney } from "react-icons/gr";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion, useInView } from 'framer-motion';
import Featuresslider from './components/Featuresslider/Featuresslider';
import FeaturesAccordion from '../components/FeaturesAccordion';
import BrandsSlider from './components/BrandsSlider/BrandsSlider';
import { AiFillOpenAI } from "react-icons/ai";
import ButtonPrimary from '../components/ButtonPrimary';


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

      <div className="rounded-xl h-full bg-white/5 border border-primary/5 shadow-xl  p-6 bg-clip-border w-full space-y-5">


        <div className='border rounded border-primary/50 w-max p-3'>
          <GrMoney className='text-primary/50 text-xl' />
        </div>

        {/* Card content here */}
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
              <h1 className='text-3xl tracking-widest font-bold ' >Building A Better </h1>
              <h1 className='text-3xl font-light tracking-widest !text-primary ' >Financial Future </h1>
            </div>
            <button className=' h-max cursor-pointer hover:bg-primary/10 transition-all border-primary/50 border w-max rounded-full flex items-center gap-2 px-5 py-2 '>Crypto Trading Now  <FaArrowRightLong className='text-primary ' /> </button>
          </div>
        </div>

        <div className='grid gap-5 grid-cols-1 lg:grid-cols-3'>
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
      <motion.div
        className='grid gap-5 border rounded-xl p-10 bg-white/5 backdrop-blur'
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
        transition={{ staggerChildren: 0.15 }}
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.2 }
          }
        }}
      >
        {/* Crypto Button */}
        <motion.button
          className='border w-max rounded-full flex items-center gap-2 px-5 py-2 border-primary/50 hover:bg-primary/10 transition-all cursor-pointer mb-10'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{once:false}}
          transition={{ duration: 0.4 }}

        >
          Crypto Trading Now <FaArrowRightLong className='text-primary' />
        </motion.button>
  
        {/* Headings and cards */}
        <motion.div
          className='flex flex-col md:flex-row gap-5 justify-between align-text-top'
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{once:false}}
          transition={{ duration: 0.6 }}
        >
          <div className='grid gap-3 w-full'>
            <motion.h1 className='text-3xl lg:text-5xl font-tight tracking-widest'>
              Building A <b className='text-accent'>Better</b>
            </motion.h1>
            <motion.h1 className='text-3xl lg:text-5xl font-tight tracking-widest'>
              Financial Future
            </motion.h1>
          </div>
  
          {/* Gradient Cards */}
          <motion.div
            className='flex gap-5 w-full bg-white/5 rounded-xl p-5'
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{once:false}}
            transition={{ duration: 0.6 }}
          >
            {[...Array(2)].map((_, i) => (
              <motion.div key={i} className='space-y-2 w-1/2'>
                <h2 className="text-lg font-medium">Gradient Border Card</h2>
                <p className='text-sm'>This card has a vertical gradient border using your primary color.</p>
                <p className='!text-primary'>Learn More.</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
  
        {/* Image & Accordion */}
        <div className='w-full flex flex-col md:flex-row gap-5'>
         
            <img
              src="/assets/images/sphere.png"
              alt=""
              className='w-1/2 absolute bottom-0 opacity-40 md:opacity-100 md:relative drop-shadow-[20px_-20px_40px_rgba(238,102,166,0.4)]'
            />
  
          <motion.div
            className='flex flex-col gap-5 items-start justify-start w-full relative'
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{once:false}}
            transition={{ duration: 0.6 }}
          >
            <h1 className='text-3xl md:text-5xl font-tight tracking-widest'>
              Building A Better
            </h1>
            <FeaturesAccordion />
          </motion.div>
        </div>
      </motion.div>
    );
  }
  




  return (
    <div className='h-[300vh] overflow-y-scroll'>
      <img src="/assets/images/divider.png" alt="" className="w-full -mb-[100px] md:-mb-[200px] lg:-mb-[450px] z-[-1] " />
      <motion.div style={{
        opacity: isInView ? 1 : 0,
        transition: "all 1s "
      }}
        className=' snap-center w-full backdrop-blur   relative overflow-hidden'>

        <span className="bg-purple-500 rounded-full h-[600px] w-[600px] blur-[400px] absolute -top-80 left-[35%] z-[-1] opacity-5"></span>
        <span className="bg-primary rounded-full w-[600px] h-[600px] absolute -top-10 -left-40 blur-[300px] opacity-30 ">
        </span>
        <div className='bg-black  mask-t-from-90%  mask-b-from-95%  pr-2 pl-1 '>
          <div className='container space-y-20 py-20 h-full' ref={itemRef} >
            <div>
              <Section1 />
            </div>
            <Section2 />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
