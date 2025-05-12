"use client"
import React, { useState } from 'react'

import DashboardSlider from './components/DashboardSlider/DashboardSlider';
import Avatar from './components/Avatar/Avatar';
import ButtonPrimary from '../components/ButtonPrimary';

import { HiOutlineDownload } from "react-icons/hi";
import { PiDownloadSimpleBold } from "react-icons/pi";

import { PiUploadSimpleBold } from "react-icons/pi";

import { FaCaretUp } from "react-icons/fa";
import { BiTransfer } from "react-icons/bi";
import { MdOutlineArrowCircleUp } from "react-icons/md";

import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { PiArrowClockwiseFill } from "react-icons/pi";
import { useRouter } from 'next/navigation';
import { appBaseRoutes } from '@/routes';
import { MdPeopleAlt } from "react-icons/md";



export default function MobileDashboard() {
  // const session = useSession()
  const router = useRouter()

  function Buttons() {

    return (
      <div className='w-full h-max '>
        <div className='grid gap-2 rounded-full '>

          <div className='flex gap-2 flex-wrap justify- items-center h-full'>
            
            <div className=' p-2 grow group  cursor-pointer' onClick={() => (router.push(appBaseRoutes.withdraw))}>
              <div className=' flex flex-col gap-2 items-center justify-center  '>
                <span className=' bg-primary/10 p-3 rounded-full'>
                  <PiDownloadSimpleBold className='text-primary/50 text-2xl group-hover:text-primary ' />
                </span>
              <p className='text-xs'>Withdraw</p>
              </div>
            </div>
            
            
            <div className=' grow p-2  group  cursor-pointer' onClick={() => (router.push(appBaseRoutes.deposit))}>
              <div className=' flex flex-col gap-2 items-center justify-center '>
                <span className=' bg-primary/10 p-3 rounded-full'>
                  <PiUploadSimpleBold className='text-primary/50 text-2xl group-hover:text-primary ' />
                </span>
              <p className='text-xs' >Deposit</p>
              </div>
            </div>



            <div className=' p-2 grow group  cursor-pointer' onClick={() => (router.push(appBaseRoutes.deposit))}>

              <div className=' flex flex-col gap-2 items-center justify-center'>
                <span className=' bg-primary/10 p-3 rounded-full'>
                  <PiArrowClockwiseFill className='text-primary/50 text-2xl group-hover:text-primary ' />
                </span>
              <p className='text-xs'>reinvest</p>
              </div>
            </div>
            <div className=' p-2 grow group  cursor-pointer' onClick={() => (router.push(appBaseRoutes.deposit))}>

              <div className=' flex flex-col gap-2 items-center justify-center  '>
                <span className=' bg-primary/10 p-3 rounded-full'>
                  <MdPeopleAlt className='text-primary/50 text-2xl group-hover:text-primary ' />
                </span>
              <p className='text-xs'>referral</p>
              </div>
            </div>




          </div>

        </div>
      </div>
    )
  }



  function HeaderMobile() {

    const [visible, setVisible] = useState(true)

    return (
      <div className=' relative  space-y-5  overflow-hidden rounded-lg'>
        <div className='w-full flex items-center h-max '>
          <div className='w-full rounded flex flex-col justify-center  gap-1 '>
            <h5 className='text-xs !text-neutral'>Total Balance in USD</h5>
            <div className='flex gap-2 items-baseline'>

              {
                visible ?
                  <div className='flex gap-2 items-baseline'>
                    <h1 className='text-4xl font-semibold '>$1,950.<span className='text-sm'>35</span> </h1>
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
        <Buttons />
      </div>
    )
  }



  return (
    <>
      <HeaderMobile />
      <div className='w-full z-0 '>
        <DashboardSlider />
      </div>
      <div className='container mx-auto '>
        <div className='flex gap-2 justify-between border-8'>
          <div className='w-full h-20 bg-gradient-to-tr from-orange-500/50 to-orange-400/50 rounded'></div>
          <div className='w-full h-20 bg-gradient-to-tr from-primary/50 to-primary/60 rounded'></div>
          <div className='w-full h-20 bg-gradient-to-tr from-primary to-white rounded'></div>
          <div className='w-full h-20 bg-gradient-to-tr from-primary to-white rounded'></div>
        </div>
      </div>
    </>
  )
}
