"use client"
import { IoIosHome } from "react-icons/io";
import { FaPlusCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { PiHandWithdrawLight } from "react-icons/pi";
import { IoAnalyticsSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { appBaseRoutes } from "@/routes";

export default function DashboardNavMobile() {

const router = useRouter()

    return (
        <div className='w-full h-max  fixed bottom-0'>
            <div className='flex gap-10 justify-evenly bg-primary/10 backdrop-blur  my-5 mx-2 p-3 rounded-full'>
                <IoIosHome className='text-white/50 text-3xl hover:!text-primary cursor-pointer' onClick={()=>router.push(appBaseRoutes.dashboard)}/>
                <IoAnalyticsSharp className='text-white/50 text-3xl hover:!text-primary cursor-pointer' onClick={()=>router.push(appBaseRoutes.dashboard)}/>
                <FaPlusCircle className='text-primary outline-8 rounded-full outline-background text-5xl hover:!text-accent hover:scale-120 transition-all cursor-pointer -m-5' onClick={()=>router.push(appBaseRoutes.deposit)}/>
                <PiHandWithdrawLight className='text-white/50 text-3xl hover:!text-primary cursor-pointer' onClick={()=>router.push(appBaseRoutes.withdraw)}/>
                <IoMdSettings className='text-white/50 text-3xl hover:!text-primary cursor-pointer' onClick={()=>router.push(appBaseRoutes.settings)}/>
            </div>
        </div>
    )
}
