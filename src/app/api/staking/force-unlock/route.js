import { authOptions } from "../../auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import User from "@/app/models/userSchema/UserSchema"
import Staking from "@/app/models/stacking/stakingSchema"
import Balance from "@/app/models/balanceSchema/balanceSchema"
import dbConnect from "@/app/lib/db"
import { revalidatePath } from "next/cache"

export async function POST(req) {

    const session = await getServerSession(authOptions)
    if (!session?.user) return Response.json({ success: false, message: 'Access denied !' })

    const data = await req.json()
    const user = session.user.id

    await dbConnect()

    const staked = await Staking.findOne({ _id: data?.id, user ,claimed:false , isLocked:true})

    if (!staked) { return Response.json({ success: false, message: 'Not found !' }) }

    if (staked.claimed) { return Response.json({ success: false, message: 'Already claimed !' }) }

    const percent = (staked.amount * 25) / 100
    const newCredit = staked.amount - percent


    const balanceDoc = await Balance.findOneAndUpdate(
        { user, currency: 'usdt' },
        { $inc: { amount: newCredit } },
        { upsert: true, new: true }
    );

    staked.claimed = true
    staked.forced = true
    staked.isLocked = false
    staked.amountClaimed = newCredit
    
    await staked.save()

    return Response.json({ succes: true, data: balanceDoc })


}