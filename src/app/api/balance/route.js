import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

import dbConnect from "@/app/lib/db";
import Balance from "@/app/models/balanceSchema/balanceSchema";



export async function GET(req) {

  const session = await getServerSession(authOptions)
  if (!session?.user) return Response.json({ success: false, message: 'Access denied !' })

  const { searchParams } = new URL(req.url);
  const currency = searchParams.get('currency');// 👈 Automatically parsed by Next.js

  if (!currency) return Response.json({ success: false, message: 'currency not found ' })


  await dbConnect()

  const currencyBalance = await Balance.findOne({ user: session.user.id, currency: currency })
  if (!currencyBalance) return Response.json({ success: false, message: 'No balance for this currency ' })
  return Response.json({ success: true, message: 'User Balance ', currencyBalance })
}