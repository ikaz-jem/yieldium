
const coinDetails = {
    sol: '/assets/images/crypto/solana.svg',
    bnb: '/assets/images/crypto/bnb.svg',
    usdt: '/assets/images/crypto/usdt.svg'

}



import { appBaseRoutes } from '@/routes'
import Link from 'next/link'
import React from 'react'
import BorderEffect from '../BorderEffect/BorderEffect'

export default function AssetsBalance({ data }) {

    return (
        <div className='flex flex-col gap-3 w-full  '>

            <div className="flex items-center justify-between">

                <h1 className="!text-neutral text-sm" >Wallet Balances</h1>
                <Link href={appBaseRoutes.deposit} className="text-xs !text-primary cursor-pointer hover:!text-accent transition-all">Deposit</Link>
            </div>
            {
                data?.balances?.map((balance, idx) => <div key={idx} className='flex p-5  gap-5 items-center border border-primary/10 bg-card rounded relative overflow-hidden backdrop-blur-xl'>

                            <BorderEffect/>

                    <img src={coinDetails[balance?.currency]} alt="" className='w-8 h-8' />
                    <div className='w-full flex justify-between'>

                        <div className='flex flex-col '>
                            <h1>{balance?.currency.toUpperCase()}</h1>
                            <p className='text-xs'>{parseFloat((balance?.amount).toFixed(2))} {balance?.currency.toUpperCase()}</p>
                            {/* <p className='text-xs'>{balance?.prices[balance?.currency]}$</p> */}

                        </div>
                        <p className='text-sm'>{parseFloat((balance?.convertedAmount).toFixed(2)) + ' $'} </p>
                    </div>
                </div>
                )
            }
        </div>)
}
