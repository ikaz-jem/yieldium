import { getServerSession } from "next-auth";
import dbConnect from "../../lib/db";
import Deposit from "../../models/depositSchema/depositSchema";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req) {
    const session = await getServerSession(authOptions)
    if (!session) return Response.json({ success: false, message: 'Unauthorized' })
    const connection = await dbConnect()

    const deposits = await Deposit.find({ user: session?.user?.id })
    if (!deposits) return Response.jsont({ success: true, message: 'No available Transactions' })
    return Response.json(deposits)

}