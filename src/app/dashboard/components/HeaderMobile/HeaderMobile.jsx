"use client"
import { MdOutlineArrowCircleUp } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { PiArrowClockwiseFill } from "react-icons/pi";  
import { useSession } from 'next-auth/react';
import { PiDownloadSimpleBold } from "react-icons/pi";
import { PiUploadSimpleBold } from "react-icons/pi";

import { useRouter } from 'next/navigation';
import { appBaseRoutes } from '@/routes';
import { MdPeopleAlt } from "react-icons/md";
import { FaChartPie } from "react-icons/fa";
import { GiMining } from "react-icons/gi";
import { FaArrowsRotate } from "react-icons/fa6";
import React, { useState } from 'react'




  export default function HeaderMobile({userData}) {
    const [visible, setVisible] = useState(true)

    
  const session = useSession()

  const router = useRouter()

  const buttons = [
    {
      title:'Withdraw',
      icon: <PiDownloadSimpleBold className='text-primary/50 text-2xl group-hover:text-primary transition-all' />,
      link:appBaseRoutes.withdraw,
    },
//     {
//       title:'Deposit',
//       icon:  <PiUploadSimpleBold className='text-primary/50 text-2xl group-hover:text-primary transition-all' />
// ,
//       link:appBaseRoutes.deposit,
//     },
    // {
    //   title:'Reinvest',
    //   icon: <PiArrowClockwiseFill className='text-primary/50 text-2xl group-hover:text-primary transition-all' />,
    //   link:appBaseRoutes.withdraw,
    // },
    {
      title:'Stake',
      icon: <FaChartPie className='text-primary/50 text-2xl group-hover:text-primary transition-all' />,
      link:appBaseRoutes.stake,
    },
    {
      title:'Mining',
      icon: <GiMining className='text-primary/50 text-2xl group-hover:text-primary transition-all' />,
      link:appBaseRoutes.mining,
    },
    {
      title:'Convert',
      icon: <FaArrowsRotate className='text-primary/50 text-2xl group-hover:text-primary transition-all' />,
      link:appBaseRoutes.convert,
    },
    {
      title:'referral',
      icon: <MdPeopleAlt className='text-primary/50 text-2xl group-hover:text-primary transition-all' />,
      link:appBaseRoutes.referrals,
    },
  ]








  function Buttons() {
    return (
      <div className='w-full h-max '>
        <div className='grid gap-1 rounded-full '>
          <div className='flex gap-2 flex-wrap justify- items-center h-full'>
            {
              buttons.map((button,idx)=> <div key={idx} className=' p-2 grow group  cursor-pointer' onClick={() => (router.push(button.link))}>
              <div className=' flex flex-col gap-2 items-center justify-center  '>
                <span className=' bg-primary/10 p-3 rounded-full'>
                 {button.icon}
                </span>
              <p className='text-xs'>{button.title}</p>
              </div>
            </div>)
            }
          </div>
        </div>
      </div>
    )
  }

    return (
      <div className=' relative  space-y-5  overflow-hidden rounded-lg'>
        <div className='w-full flex items-center h-max '>

          <div className='w-full rounded flex flex-col justify-center  gap-1 '>
            <h5 className='text-xs !text-neutral'>Total Balance in USD</h5>
            <div className='flex gap-2 items-baseline'>
              {
                visible ?
                  <div className='flex gap-2 items-baseline'>
                    <h1 className='text-4xl font-semibold '>${parseFloat((userData?.totalValue).toFixed(2)) || 0}</h1>
                    <FaEyeSlash className='text-white/50 text-2xl hover:text-primary cursor-pointer' onClick={() => setVisible(false)} />
                  </div>
                  :
                  <div className='flex gap-2 items-baseline'>
                    <h1 className='text-4xl font-semibold '>$****** </h1>
                    <FaEye className='text-white/50 text-2xl hover:text-primary cursor-pointer' onClick={() => setVisible(true)} />
                  </div>
              }
            </div>
          </div>
          <div className='flex gap-1 items-center px-2  rounded-full bg-green-500/20 py-1 '>
            <h5 className='text-sm !text-green-500'> +15.5%</h5>
            <MdOutlineArrowCircleUp className='text-green-500 text-xl hover:!text-primary cursor-pointer' />
          </div>

          {/* <ButtonPrimary>Deposit</ButtonPrimary> */}
        </div>
        <div className='flex gap-2 items-center'>
        <img src="/assets/images/logo.png" alt="" className='w-5 h-5'/>

        <h1 className='text-xl font-semibold '>158 <span className='text-sm'>Yield Coin</span> </h1>
        </div>
        <Buttons />
      </div>
    )
  }
