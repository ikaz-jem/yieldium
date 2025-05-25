"use client"
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

import { LuLogOut } from "react-icons/lu";
import { signOut } from 'next-auth/react';
import { mutate } from "swr";

export default function Avatar({img}) {

const handleLogout = async () => {
  await signOut();
  mutate(() => true, undefined, { revalidate: false }); // clear all SWR cache
  // Clear Zustand, localStorage, etc. here too
};


  return (
    <div >
      <Menu>
        <MenuButton className="cursor-pointer" >
                    <img src={img} alt="" className='w-10 h-10 rounded-full cursor-pointer' />
        </MenuButton>

        <MenuItems
        
          transition
          anchor="bottom end"
          className=" w-52 origin-top-right rounded-xl border border-white/5 bg-background p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
          <MenuItem className='cursor-pointer' onClick={handleLogout}>
            <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
              <LuLogOut className="size-4 fill-white/30" />
              Sign Out
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">⌘E</kbd>
            </button>
          </MenuItem>

        </MenuItems>
      </Menu>
    </div>
  )
}