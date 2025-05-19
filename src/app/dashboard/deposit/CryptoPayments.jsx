"use client"
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import clsx from 'clsx'
import { useEffect, useState, useTransition } from 'react'
import { FaChevronDown } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { RiBnbFill } from "react-icons/ri";
import ButtonPrimary from '@/app/components/ButtonPrimary';
import { GenerateQr } from '@/actions/generateQr';
import { IoMdCopy } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import {
    ClipLoader
} from 'react-spinners'


// For generating a data URL
import { cryptoDeposits } from './data';
import { getTonWallet } from '@/web3/wallets/createOrGetTonWallet';
import { getSolanaWallet } from '@/web3/wallets/createOrGetSolanaWallet';
import { getEvmWallet } from '@/web3/wallets/createOrGetEvmWallet';

import { useSession } from 'next-auth/react';

import { checkDeposit } from '@/web3/transactions/pollTransaction';
import { depositFunds } from '@/actions/web3Actions/depositFunds';
import DepositHistory from './DepositHistory';


function CryptoPayment() {
    const session = useSession()
    const user = session?.data?.user

    const [selected, setSelected] = useState({ id: 0, name: 'please wait ...' })
    const [isPending, startTransition] = useTransition()





    useEffect(() => {
        if (!selected?.address) {
            handleSelect(cryptoDeposits[0])

        }
    }, [session?.user?.walletIndex, session?.status]);


    const extractDepositAddress = async (e) => {
        if (user?.walletIndex && e.network == 'ton') {
            const data = await getTonWallet(Number(user?.walletIndex), 0)
            return data
        } else if (user?.walletIndex && e.network == 'solana') {
            const data = await getSolanaWallet(Number(user?.walletIndex), 0)
            return data
        } else if (user?.walletIndex && e.network == 'evm') {
            const data = await getEvmWallet(Number(user?.walletIndex), 0)
            return data
        } else {
            return { address: null }
        }
    }





    const handleSelect = async (e) => {
        let { address, privateKey } = await extractDepositAddress(e)
        startTransition(async () => {
            const Qr = await GenerateQr(address)
            const tokenDetails = {
                ...e,
                qr: Qr,
                address: address,
                key: privateKey
            }
            setSelected(tokenDetails)
            const deposit = await checkDeposit(address, tokenDetails, user, privateKey)
            if (deposit?.success) {
                let depositResult = await depositFunds(deposit)

            }
        })
    }





    function CopyButton({ text }) {
        const [copied, setCopied] = useState(false);

        const handleCopy = async () => {
            try {
                await navigator.clipboard.writeText(text);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
            } catch (err) {
                console.error('Failed to copy text:', err);
            }
        };
        return (
            <div className='flex items-center justify-between w-full py-1 px-2 bg-white/10 rounded h-10'>
                <p className='text-xs truncate w-60'>{text}</p>
                {copied ?
                    <FaCheckCircle
                        className="cursor-pointer !text-green-500 text-xl " />
                    :
                    <IoMdCopy onClick={handleCopy} className="cursor-pointer !text-neutral text-2xl hover:!text-primary" />
                }
            </div>
        );
    }






    return (
        <div className="mx-auto space-y-5 w-full p-5">
            <p className='text-sm font-semibold'>Select Currency</p>

            <Listbox value={selected} onChange={handleSelect}>
                <ListboxButton
                    className={clsx(
                        'relative block w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white',
                        'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                    )}
                >
                    {selected.name}
                    <FaChevronDown
                        className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                        aria-hidden="true"
                    />
                </ListboxButton>
                <ListboxOptions
                    anchor="bottom"
                    transition
                    className={clsx(
                        'w-(--button-width) backdrop-blur z-5 rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:--spacing(1)] focus:outline-none',
                        'transition duration-100 ease-in data-leave:data-closed:opacity-0'
                    )}
                >
                    {cryptoDeposits.map((person) => (
                        <ListboxOption
                            key={person.name}
                            value={person}
                            className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10"
                        >
                            <FaCheck className="invisible size-4 fill-white group-data-selected:visible" />
                            <div className="text-sm/6 text-white">{person.name}</div>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>

            <form className=' gap-5 grid space-y-5 relative'>
                <div className='grid gap-3'>
                    <p className='text-sm font-semibold'>Amount</p>
                    <input
                        className='bg-white/10 aria-selected:bg-none auto text-white rounded h-10 p-3 text-sm outline-none focus:border-primary/50 focus:border disabled:cursor-not-allowed disabled:bg-neutral-400/30'
                        name="email"
                        type="email"
                        placeholder="Crypto Amount"
                        value=''
                        onChange={() => console.log('change')}
                        required
                        disabled={false}
                    />
                </div>
                <div className='grid gap-3'>
                    <p className='text-sm font-semibold'>Comment</p>
                    <input
                        className='bg-white/10  text-white rounded h-10 p-3 text-sm outline-none focus:border-primary/50 focus:border disabled:cursor-not-allowed disabled:bg-neutral-400/30'
                        name="password"
                        type="password"
                        placeholder="Additional Details"
                        value={''}
                        onChange={() => console.log('change')}
                        required
                        disabled={false}
                    />
                </div>
                {
                    isPending && !selected.qr ?
                        <div className='w-full space-y-5 flex items-center justify-center  h-40'>
                            <ClipLoader className='text-xs' color='var(--title)' size={25} />
                        </div>
                        :
                        <div className='w-full space-y-5 '>
                            <div className='flex items-center justify-center w-full h-40'>
                                <img src={selected?.qr} alt="" className='w-40 h-40 rounded-xl' />

                            </div>
                            <CopyButton text={selected.address} />
                            <ButtonPrimary disabled={false} onClick={() => checkDeposit(selected.address)} className={'w-max px-4'}>Confirm Deposit</ButtonPrimary>
                        </div>
                }
            </form>
            <p className='text-sm '>Funds will be credited within 10s to 1 min</p>
        </div>
    )
}











export default function CryptoPayments() {


function DeopsitTypes() {
    return (
        <div className="flex  w-full justify-center  pt-5">
            <div className="w-full ">
                <TabGroup>
                    <TabList className="flex gap-4">
                        <Tab
                            className="rounded-full flex gap-2 items-center px-3 py-1 text-sm/6 font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-white/5 data-selected:bg-white/10 data-selected:data-hover:bg-white/10">
                            <RiBnbFill className='text-lg' />
                            <p className='text-white'>Crypto</p>
                        </Tab>
                    </TabList>
                    <TabPanels className="mt-3">
                        <TabPanel className="rounded-xl bg-white/5 ">
                            <CryptoPayment />
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </div>
        </div>
    )
}



    return (
        <>
            <DeopsitTypes />
            <DepositHistory />

        </>
    )
}