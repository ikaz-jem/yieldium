import { appBaseRoutes } from "@/routes";
import Link from "next/link";
import { FaLock } from "react-icons/fa";
import { formatISO } from "@/app/utils/formatISO"
import BorderEffect from "../BorderEffect/BorderEffect";



export default function DashboardInvestments({ data }) {
    let filter ='active'

    

    const contracts = data?.staking?.filter((contract) => {
        if (filter === 'active') return !contract.claimed
        if (filter === 'claimed') return contract.claimed
        if (filter === 'forced') return contract.forced
    })


    return (


        <>

            {
                contracts?.length > 0 ?
                    <div className='flex flex-col gap-3  w-full  '>
                        <div className="flex items-center justify-between">

                            <h1 className="!text-neutral text-sm" >Investment</h1>
                            <Link href={appBaseRoutes.contracts} className="text-xs !text-primary cursor-pointer hover:!text-accent transition-all">Manage</Link>
                        </div>
                        {contracts?.map((stake, idx) =>
                            <div key={idx} className='flex flex-col gap-2 border border-primary/10 p-5 rounded relative overflow-hidden bg-card backdrop-blur-xl'>

                                <BorderEffect />
                                <div className='flex  gap-5 items-center '>

                                    <img src='/assets/images/crypto/usdt.svg' alt="" className='w-8 h-8' />
                                    <div className='w-full flex justify-between'>

                                        <div className='flex flex-col '>
                                            <h1>Tether</h1>
                                            <p className='text-xs'>{parseFloat((stake?.amount).toFixed(2))} USDT</p>
                                            {/* <p className='text-xs'>{balance?.prices[balance?.currency]}$</p> */}

                                        </div>
                                        <p className='text-sm !text-green-500'>{parseFloat((stake?.profits).toFixed(2)) + ' $'} </p>
                                    </div>
                                </div>
                                <div className="flex justify-between ">

                                    <p className='text-sm'>{formatISO(stake.unlocksAt)} </p>
                                    <div className="flex items-center gap-2">
                                        <p className='text-sm'>{stake.duration} days </p>

                                        <FaLock className="text-yellow-500" />
                                    </div>
                                </div>
                            </div>
                        )
                        }


                    </div>
                    :


                    <div className='flex flex-col gap-2 border border-primary/10  rounded w-full h-max'>
                        <img src='/assets/images/bsc.png' alt="" className='w-full' />
                        {/* <div className='flex  gap-5 items-center '>

                            <div className='w-full flex justify-between'>

                                <div className='flex flex-col '>
                                    <h1>Tether</h1>
                                    <p className='text-xs'>USDT</p>
                                    <p className='text-xs'>$</p>

                                </div>
                                <p className='text-sm !text-green-500'>' $' </p>
                            </div>
                        </div>
                        <div className="flex justify-between ">

                            <p className='text-sm'>hjfyj </p>
                            <div className="flex items-center gap-2">
                                <p className='text-sm'> days </p>

                                <FaLock className="text-yellow-500" />
                            </div>
                        </div> */}
                    </div>

            }
        </>

    )
}
