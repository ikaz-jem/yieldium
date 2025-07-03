
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import dbConnect from "@/app/lib/db"
import Staking from "@/app/models/stacking/stakingSchema"
import Balance from "@/app/models/balanceSchema/balanceSchema"
import User from "@/app/models/userSchema/UserSchema"


export async function GET() {

    const session = await getServerSession(authOptions)
    if (!session?.user) return Response.json({ success: false, message: 'Access denied !' })

    await dbConnect()

    const stakes = await Staking.find({ user: session.user.id }).sort({ createdAt: -1 });

    if (!stakes) {
        return Response.json({ success: false, message: 'No available Investments' })
    }

    return Response.json({ succes: true, data: stakes })


}


export async function POST(req) {

    const session = await getServerSession(authOptions)
    if (!session?.user) return Response.json({ success: false, message: 'Access denied !' })

    const { duration, amount, profits, rate } = await req.json()

    if (Number(amount) <=9) return Response.json({success:false , message:'Min Investment is 10 USDT'})


    const user = session.user.id

    const unlocksAt = new Date();
    unlocksAt.setDate(unlocksAt.getDate() + Number(duration));

    await dbConnect()

    const currentBalance = await Balance.findOne({ user, currency: 'usdt' });
    if (!currentBalance || currentBalance.amount < amount) {
        return Response.json({ success: false, message: 'low Balance Deposit or convert' })
    }

    const balanceDoc = await Balance.findOneAndUpdate(
        { user, currency: 'usdt' },
        { $inc: { amount: -(amount + 1) } },
        { upsert: true, new: true }
    );


    const staked = await Staking.create(
        {
            user,
            amount,
            duration,
            profits,
            rate,
            unlocksAt,
        },
    );

    const userUpdated = await User.findByIdAndUpdate(
        user,
        { $addToSet: { staking: staked._id } },
        { new: true, upsert: false }
    );


    if (!staked) {
        return Response.json({ success: false, message: 'Could Not Invest please try again' })
    }
   
    return Response.json({ success: true, data: staked })


}