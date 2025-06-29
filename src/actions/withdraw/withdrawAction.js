
"use server"


import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import dbConnect from '@/app/lib/db'
import balanceSchema from '@/app/models/balanceSchema/balanceSchema'

export async function withdrawAction({ amount }) {

    const session = await getServerSession(authOptions)
    if (!session) {
        return { success: false }
    }

    const connection = await dbConnect()

    const balance = await balanceSchema.findOne({ user: session.user.id, currency: 'usdt' })

    if (balance.amount < amount) {
        return { success: false, message: 'low balance' }
    }

    if (amount < 50) {
        return { success: false, message: 'Min Withdraw is 50 USDT' }
    }


    try {
        const { withdrawUsdt } = await import('@/web3/transactions/withdrawUsdt.js') // adjust the path if needed

        const result = await withdrawUsdt({
            toAddress: '0xRecipientAddressHere',
            privateKey: '0xYourPrivateKeyHere',
            chain: 'bsc', // or 'bscTestnet' or 'tron'
            amount: amount - 1,
        })


        if (result.success) {
            balance.amount -= amount
            await balance.save()
            return { success: true, message: `withdraw of ${amount} completed ! ` }
        }


    } catch (error) {
        console.error('Error importing or running transfer:', error)
    }
}

