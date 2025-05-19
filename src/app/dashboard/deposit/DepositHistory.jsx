


import axios from 'axios'
import React, { useEffect, useState } from 'react'





export default function DepositHistory() {
    const [deposits, setDeposits] = useState(null)

    async function getDeposits() {

        const deposits = await axios.get('/api/deposits').then((res) => res.data)
        setDeposits(deposits)

    }

    useEffect(() => {
        getDeposits()
    }, [])


function extractClassName  (status){

    if (status == "pending"){
        return "!text-yellow-400 border border-yellow-500 bg-yellow-500/10"
    }
    if (status == "credited"){
        return "!text-green-400 border border-green-500 bg-green-500/10"
    }
    if (status == "canceled"){
        return "!text-red-400 border border-red-500 bg-red-500/10"
    }
    if (status == "error"){
        return "!text-red-400 border border-red-500 bg-red-500/10"
    }

}


    function DepositCard({ deposit }) {

        return (

            <div className='w-full border-primary/50 bg-white/10 rounded  p-5'>
                <div className='flex flex-col gap-2 w-max'>

                <h1 className='text-white text-2xl'>{deposit?.amount} {deposit?.currency} <span className='text-xs capitalize'> {deposit?.chain}</span> </h1>
                <p className={` ${extractClassName(deposit?.status)} rounded px-2 p-1 !text-xs w-max '`}>{deposit?.status}</p>
                <p className={`  px-2 p-1 !text-xs w-40 truncate '`}>{deposit?.signature}</p>
                </div>
            </div>


        )

    }

    return (
        <div className='mb-10 space-y-10'>
            <h1 className='text-3xl text-white '>
                Deposit History
            </h1>

            <div className='w-full bg-black flex flex-col gap-5'>
                {
                    deposits?.length > 0 && deposits?.map((deposit) => <DepositCard key={deposit?._id} deposit={deposit} />)
                }

            </div>

        </div>
    )
}
