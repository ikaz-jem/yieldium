import React from 'react'
import motion from 'framer-motion'
import { FaArrowRightLong } from "react-icons/fa6";
import BrandsSlider from './components/BrandsSlider/BrandsSlider';


export default function SectionHowItWorks() {

  const images = [
    {
      src: '/assets/images/sphere.png',
      title: 'Create Account',
    },
    {
      src: '/assets/images/sphere.png',
      title: 'Create Account',
    },
    {
      src: '/assets/images/sphere.png',
      title: 'Create Account',
    },
    {
      src: '/assets/images/sphere.png',
      title: 'Create Account',
    },


  ]


  function Card(props) {
    const { item, idx } = props
    return (
      <div className='grid gap-5 '>
        <div className='[box-shadow:0px_-20px_40px_rgba(238,102,166,0.3)] '>
        <div className='bg-gradient-to-br from-primary to-pink-500/50 p-5 mask-b-from-80% rounded-lg  '>

          <img src={item?.src} alt="" className='w-60 h-60  ' />
        </div>
        </div>
        <div className='flex items-baseline gap-2'>
          <span className='text-3xl text-neutral'>{idx + 1} .</span>
          <span className='text-lg text-white font-light'>{item?.title} </span>
        </div>
        <span className="relative inline-block after:block after:h-[1px] after:bg-primary after:w-1/2 after:absolute after:bottom-0 after:left-1/4 w-40">
        </span>
      </div>
    )

  }


  function Card2({ data }) {

    return (
      <div className="rounded-xl p-5 bg-gradient-to-br from-primary/40 to-pink-500/50 from-40% /10 w-full h-max z-1">
        <div className="rounded-xl bg-background flex justify-end bg-clip-border w-full h-full relative bg-gradient-to-tr from-background to-neutral-900 ">
          <img src="/assets/images/mobile.png" alt="" className='absolute bottom-0 left-0 drop-shadow-[0px_-20px_40px_rgba(238,102,166,0.3)] ' />
          <div className='text-left gap-3 flex justify-between align-baseline p-10 my-5'>
            <div className=''>
              <h1 className='text-4xl tracking-widest font-bold ' >Yieldium ,Your Growth  </h1>
              <h1 className='text-2xl font-light tracking-widest !text-primary ' >Your Pocket Financial Companion ! </h1>
              <p className=' tracking-widest  max-w-md !text-neutral py-5 ' >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scra </p>
            </div>
          </div>
        </div>
      </div>
    )
  }




  return (
    <div

      className='h-max snap-center w-full backdrop-blur relative bg-gradient-to-b from-background to-black overflow-hidden py-20'>
      <span className="bg-pink-500 rounded-full h-[600px] w-[600px] blur-[400px] absolute top-[80] left-[35%] z-[-1] opacity-40"></span>
      <span className="bg-primary rounded-full w-[600px] h-[600px] absolute top-[50%] -left-40 blur-[300px] opacity-30 ">
      </span>
      <div className='container  pt-20 h-full space-y-20'  >


        <div className='text-left gap-3 flex justify-between align-baseline '>
          <div className='space-y-3'>
            <h1 className='text-5xl tracking-widest font-bold ' >Building A Better </h1>
            <h1 className='text-5xl font-light tracking-widest !text-primary ' >Financial Future </h1>
          </div>
          <button className=' h-max cursor-pointer hover:bg-primary/10 transition-all border-primary/50 border w-max rounded-full flex items-center gap-2 px-5 py-2 '>Crypto Trading Now  <FaArrowRightLong className='text-primary ' /> </button>
        </div>

<div className=' py-10'>
          <BrandsSlider/>

</div>

        <div className='flex justify-between w-full'>

          {
            images?.map((item, idx) => <div className={`${idx == 1 && `mt-10`} ${idx == 3 && `mt-20`} `} key={idx}>
              <Card item={item} idx={idx} />
            </div>)
          }
        </div>
        <p className=' tracking-widest text-center  !text-neutral ' >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scra </p>
        <div className='w-full py-20'>
          <Card2 />
        </div>
      </div>
    </div>
  )
}
