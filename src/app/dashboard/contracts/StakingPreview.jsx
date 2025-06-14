"use client"

import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import { formatISO } from "@/app/utils/formatISO";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import ButtonSecondary from "@/app/components/ButtonSecondary";
import { timeLeft } from "@/app/utils/timeLeft";
import ForceUnlockModal from "./ForceUnlockModal";
import BorderEffect from "../components/BorderEffect/BorderEffect";
import { useState } from "react";
import Link from "next/link";
import { appBaseRoutes } from "@/routes";
import { FaCheck } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { timeAgo } from "@/app/utils/timeAgo";
import { useRouter } from "next/router";
import Unlock from "./Unlock";

export default function StakingPreview({ contracts }) {
    const [filter, setFilter] = useState('active')

    const filteredContracts = contracts.filter((contract) => {
        if (filter === 'active') return !contract.claimed
        if (filter === 'claimed') return contract.claimed
        if (filter === 'forced') return contract.forced
    })

    function ComponentFilter() {
        if (filter == "active") return <Active setFilter={setFilter} contracts={filteredContracts} />
        if (filter == "claimed") return <Claimed setFilter={setFilter} contracts={filteredContracts} />
        if (filter == "forced") return <Forced setFilter={setFilter} contracts={filteredContracts} />
    }

    return (
        <div className="grid gap-5">
            <div className="w-full flex gap-2">
                <p className={`!text-white rounded bg-card backdrop-blur px-5 py-1 border-primary/10 border cursor-pointer hover:bg-primary/40 !text-sm ${filter == "active" && "!bg-primary/40"}`} onClick={() => setFilter('active')}>Active Investments</p>
                <p className={`!text-white rounded bg-card backdrop-blur px-5 py-1 border-primary/10 border cursor-pointer hover:bg-primary/40 !text-sm ${filter == "claimed" && "!bg-primary/40"}`} onClick={() => setFilter('claimed')}>Claimed</p>
                <p className={`!text-white rounded bg-card backdrop-blur px-5 py-1 border-primary/10 border cursor-pointer hover:bg-primary/40 !text-sm ${filter == "forced" && "!bg-primary/40"}`} onClick={() => setFilter('forced')}>Forced</p>
            </div>

            <ComponentFilter />
        </div>
    )
}





function Active({ contracts }) {

    const now = new Date();




    if (contracts.length == 0) return (
        <div className='flex flex-col  w-full gap-2 border border-primary/10 p-5 bg-card rounded backdrop-blur-xl relative overflow-hidden '>
            <BorderEffect />
            <h1 className="text-white">
                No Contract is Available !
            </h1>
            <Link href={appBaseRoutes.invest} className={`!text-white w-max rounded backdrop-blur px-5 py-1 border-primary/10 border cursor-pointer hover:bg-primary/40 !text-sm bg-card`}>Get Started</Link>

        </div>
    )

    return (
        <div className="grid gap-5">


            <div className="flex items-center justify-between">

                <h1 className="!text-neutral text-sm" >Investments</h1>
            </div>
            <div className='flex gap-5 flex-wrap   w-full '>
                {contracts?.map((contract, idx) => {

                    const target = new Date(contract.unlocksAt);
                    const diffMs = target.getTime() - now.getTime();
                    let disabled = diffMs >= 0
                    return (
                        <div key={idx} className='flex flex-col max-w-xl w-full gap-2 border border-primary/10 p-5 bg-card rounded backdrop-blur-xl relative overflow-hidden '>
                            <BorderEffect />

                            <div className='flex  gap-5 items-center '>

                                <img src='/assets/images/crypto/usdt.svg' alt="" className='w-8 h-8' />
                                <div className='w-full flex justify-between'>
                                    <div className='flex flex-col '>
                                        <h1>Tether</h1>
                                        <p className='text-xs'>{parseFloat((contract?.amount).toFixed(2))} USDT</p>
                                        {/* <p className='text-xs'>{balance?.prices[balance?.currency]}$</p> */}
                                    </div>
                                    <p className='text-sm !text-green-500'>{parseFloat((contract?.profits).toFixed(2)) + ' $'} </p>
                                </div>
                            </div>

                            <div className="flex justify-between ">
                                <p className='text-sm'>{timeLeft(contract.unlocksAt)} </p>
                            </div>


                            <div className="flex justify-between ">

                                <p className='text-sm'>{formatISO(contract.unlocksAt)} </p>
                                <div className="flex items-center gap-2">
                                    <p className='text-sm'>{contract.duration} days </p>

                                    {
                                        disabled ?
                                            <FaLock className="text-yellow-500" />
                                            :
                                            <FaUnlock className="text-primary" />
                                    }

                                </div>
                            </div>


                            <div className="flex gap-2">
                                <Unlock contract={contract} />
                                {disabled && <ForceUnlockModal contract={contract} />}
                            </div>

                        </div>)
                }
                )
                }


            </div>
            <p className='text-sm'>Using Force Unlock to Withdraw Before Time will Apply 25% Fees instead Of 1 USDT </p>
        </div>
    )
}
function Claimed({ contracts }) {


    if (contracts.length == 0) return (
        <div className='flex flex-col  w-full gap-2 border border-primary/10 p-5 bg-card rounded backdrop-blur-xl relative overflow-hidden '>
            <BorderEffect />
            <h1 className="text-white">
                No Contract Was Claimed Yet !
            </h1>
        </div>
    )

    return (
        <div className="grid gap-5">


            <div className="flex items-center justify-between">

                <h1 className="!text-neutral text-sm" >Investments</h1>
            </div>
            <div className='flex gap-5 flex-wrap   w-full '>
                {contracts?.map((contract, idx) =>
                    <div key={idx} className='flex flex-col max-w-xl w-full gap-2 border border-primary/10 p-5 bg-card rounded backdrop-blur-xl relative overflow-hidden '>
                        <BorderEffect />

                        <div className='flex  gap-5 items-center '>

                            <img src='/assets/images/crypto/usdt.svg' alt="" className='w-8 h-8' />
                            <div className='w-full flex justify-between'>
                                <div className='flex flex-col '>
                                    <h1>Tether</h1>
                                    <p className='text-xs'>{parseFloat((contract?.amount).toFixed(2))} USDT</p>
                                    {/* <p className='text-xs'>{balance?.prices[balance?.currency]}$</p> */}
                                </div>
                                <p className='text-sm !text-green-500'>{parseFloat((contract?.profits).toFixed(2)) + ' $'} </p>
                            </div>
                        </div>

                        <div className="flex justify-between ">
                            <p className='text-sm'>Status :</p>
                            <p className='text-xs !text-green-500 flex items-center gap-1 '> Claimed  <FaCheck /> </p>
                        </div>


                        <div className="flex justify-between ">

                            <p className='text-sm'>Claimed At :</p>
                            <div className="flex items-center gap-2">
                                <p className='text-xs'>{timeAgo(contract.updatedAt)}  </p>

                                {
                                    contract?.isLocked ?
                                        <FaLock className="text-yellow-500" />
                                        :
                                        <FaUnlock className="text-primary" />
                                }

                            </div>
                        </div>

                        <div className="flex justify-between ">
                            <p className='text-sm'>Total Claimed : </p>
                            <p className=' !text-green-500'>{parseFloat((contract?.amountClaimed)?.toFixed(2)) + ' $'} </p>
                        </div>
                    </div>
                )
                }


            </div>
            <p className='text-sm'>Using Force Unlock to Withdraw Before Time will Apply 25% Fees instead Of 1 USDT </p>
        </div>
    )
}





function Forced({ contracts }) {

    if (contracts.length == 0) return (
        <div className='flex flex-col  w-full gap-2 border border-primary/10 p-5 bg-card rounded backdrop-blur-xl relative overflow-hidden '>
            <BorderEffect />
            <h1 className="text-white">
                No Contract Was Forced Yet !
            </h1>
        </div>
    )

    return (
        <div className="grid gap-5">


            <div className="flex items-center justify-between">

                <h1 className="!text-neutral text-sm" >Investments</h1>
            </div>
            <div className='flex gap-5 flex-wrap   w-full '>
                {contracts?.map((contract, idx) =>
                    <div key={idx} className='flex flex-col max-w-xl w-full gap-2 border border-primary/10 p-5 bg-card rounded backdrop-blur-xl relative overflow-hidden '>
                        <BorderEffect />

                        <div className='flex  gap-5 items-center '>

                            <img src='/assets/images/crypto/usdt.svg' alt="" className='w-8 h-8' />
                            <div className='w-full flex justify-between'>
                                <div className='flex flex-col '>
                                    <h1>Tether</h1>
                                    <p className='text-xs'>{parseFloat((contract?.amount).toFixed(2))} USDT</p>
                                    {/* <p className='text-xs'>{balance?.prices[balance?.currency]}$</p> */}
                                </div>
                                <p className='text-sm !text-green-500'>{parseFloat((contract?.profits).toFixed(2)) + ' $'} </p>
                            </div>
                        </div>

                        <div className="flex justify-between ">
                            <p className='text-sm'>Status :</p>
                            <p className='text-xs !text-accent flex items-center gap-1 '> Force Claim  <IoIosWarning /> </p>
                        </div>


                        <div className="flex justify-between ">

                            <p className='text-sm'>Claimed At :</p>
                            <div className="flex items-center gap-2">
                                <p className='text-xs'>{timeAgo(contract.updatedAt)}  </p>

                                {
                                    contract?.isLocked ?
                                        <FaLock className="text-yellow-500" />
                                        :
                                        <FaUnlock className="text-primary" />
                                }

                            </div>
                        </div>

                        <div className="flex justify-between ">
                            <p className='text-sm'>Total Claimed : </p>
                            <p className=' !text-green-500'>{parseFloat((contract?.amountClaimed)?.toFixed(2)) + ' $'} </p>
                        </div>



                    </div>
                )
                }


            </div>


        </div>

    )
}