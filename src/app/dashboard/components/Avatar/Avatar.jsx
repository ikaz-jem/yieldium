"use client"
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

import { LuLogOut } from "react-icons/lu";
import { signOut } from 'next-auth/react';
import { mutate } from "swr";

import { MdAccountCircle } from "react-icons/md";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { TbCreditCardRefund } from "react-icons/tb";
import { RiFundsLine } from "react-icons/ri";
import { useRouter } from 'next/navigation';
import { appBaseRoutes } from '@/routes';
import BorderEffect from '../BorderEffect/BorderEffect';

export default function Avatar({img}) {

  const router = useRouter()

const handleLogout = async () => {
  await signOut();
  mutate(() => true, undefined, { revalidate: false }); // clear all SWR cache
  // Clear Zustand, localStorage, etc. here too
};

function Navigate (path){
router.push(path)
}

  return (
    <div >
      <Menu>
        <MenuButton className="cursor-pointer" >
                    <img src={img} alt="" className='w-10 h-10 rounded-full cursor-pointer' />
        </MenuButton>

        <MenuItems
        
          transition
          anchor="bottom end"
          className=" w-52 origin-top-right rounded-xl border border-white/5 bg-card backdrop-blur-xl p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >

        < BorderEffect/>
          <MenuItem className='cursor-pointer' >
            <button onClick={()=>Navigate(appBaseRoutes.settings)}  className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
              <MdAccountCircle className="size-4 fill-white/30" />
              Account
            </button>
          </MenuItem>

          <MenuItem className='cursor-pointer' >
            <button onClick={()=>Navigate(appBaseRoutes.referrals)}  className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
              <IoPeopleCircleOutline className="size-4 fill-white/30" />
              Referrals
            </button>
          </MenuItem>
          <MenuItem className='cursor-pointer' >
            <button onClick={()=>Navigate(appBaseRoutes.deposit)}  className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
              <TbCreditCardRefund className="size-4 fill-white/30" />
              Deposit
            </button>
          </MenuItem>
          <MenuItem className='cursor-pointer' >
            <button onClick={()=>Navigate(appBaseRoutes.invest)}  className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
              <RiFundsLine className="size-4 fill-white/30" />
              Invest
            </button>
          </MenuItem>

                    <div className="my-1 h-px bg-white/5" />

          <MenuItem className='cursor-pointer' onClick={handleLogout}>
            <button  className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
              <LuLogOut className="size-4 fill-white/30" />
              Sign Out
            </button>
          </MenuItem>

        </MenuItems>
      </Menu>
    </div>
  )
}