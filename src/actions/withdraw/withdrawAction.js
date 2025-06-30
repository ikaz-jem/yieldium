
"use server"


import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import dbConnect from '@/app/lib/db'
import Balance from '@/app/models/balanceSchema/balanceSchema'
import UserSchema from '@/app/models/userSchema/UserSchema'

export async function withdrawAction(amount ,toAddress ,chain) {

    const session = await getServerSession(authOptions)
    if (!session) {
        return { success: false }
    }

    let key = process.env.WITHDRAW


    const connection = await dbConnect()
    
    const user = await UserSchema.findById(session.user.id)

    if (!user) return {success:false , message:'User Not Found' , type:'error'}
    if (!user.emailVerified) return {success:false , message:'Email Verification Required' , type:'error'}

    const balance = await Balance.findOne({ user: session.user.id, currency: 'usdt' })
    
    if (balance.amount < amount) {
        return { success: false, message: 'low balance' }
    }
    

    
    if (amount < 50) {
        return { success: false, message: 'Min Withdraw is 50 USDT' }
    }
    // return {success:true , message:'Pass' }

    try {
        const { withdrawUsdt } = await import('@/web3/transactions/withdrawUsdt.js') // adjust the path if needed

        const result = await withdrawUsdt({
            toAddress: toAddress,
            privateKey: key,
            chain: chain, // or 'bscTestnet' or 'tron'
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

