"use client"
import ButtonPrimary from '@/app/components/ButtonPrimary'
import ButtonSecondary from '@/app/components/ButtonSecondary'
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { formatISO } from '@/app/utils/formatISO'
import { timeLeft } from '@/app/utils/timeLeft'
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import BorderEffect from '../components/BorderEffect/BorderEffect'
export default function ForceUnlockModal({ contract }) {
    let [isOpen, setIsOpen] = useState(false)

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    return (
        <>
            <ButtonSecondary onClick={open}>
                Force Unlock
            </ButtonSecondary>

            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>

                <div className="fixed inset-0 z-50 w-screen overflow-y-auto backdrop-blur-md bg-black/20 ">
                   
                    <div className="flex min-h-full items-center justify-center p-4 relative overflow-hidden">
                        <DialogPanel transition className="w-full space-y-5 relative max-w-lg rounded-xl bg-primary/5 p-6 backdrop-blur-xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0">
                        <BorderEffect/>
                          
                            <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                                Are You sure You wanna Force Unlock ?
                            </DialogTitle>

                            <p className="mt-2 text-sm/6 text-white/50">
                                Forcing The Unlock will result in
                                <span className='text-primary px-1'>
                                    25% Fees
                                </span>
                                , are you Sure you wanna continue ?
                            </p>

                            <div className='flex flex-col max-w-xl w-full gap-2 border border-primary/10 p-5 rounded backdrop-blur-xl'>
                              
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
                                            contract?.isLocked ?
                                                <FaLock className="text-yellow-500" />
                                                :
                                                <FaUnlock className="text-yellow-500" />
                                        }
                                    </div>
                                </div>

                            </div>

                            <div className="mt-4 flex gap-2">
                                <ButtonPrimary onClick={close}>
                                    Cancel
                                </ButtonPrimary>
                                <ButtonSecondary onClick={close}>
                                    Yes I'm Aware
                                </ButtonSecondary>
                            </div>

                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}