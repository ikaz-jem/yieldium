import { authOptions } from "../../auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import User from "@/app/models/userSchema/UserSchema"
import Staking from "@/app/models/stacking/stakingSchema"
import Balance from "@/app/models/balanceSchema/balanceSchema"


export async function POST(req) {

    const session = await getServerSession(authOptions)
    if (!session?.user) return Response.json({ success: false, message: 'Access denied !' })

    const data = await req.json()
    const user = session.user.id

    await dbConnect()

    const staked = await Staking.findOne({ _id: data?.id, user })

    if (!staked) { return Response.json({ success: false, message: 'Not found !' }) }

    if (staked.claimed) { return Response.json({ success: false, message: 'Already claimed !' }) }

    if (new Date() < staked.unlocksAt) { return NextResponse.json({ success: false, message: "Stake still locked" }); }

    const balanceDoc = await Balance.findOneAndUpdate(
        { user, currency: 'usdt' },
        { $inc: { amount: staked.profits } },
        { upsert: true, new: true }
    );

    staked.claimed = true

    await staked.save()

    return Response.json({ succes: true, data: balanceDoc })


}