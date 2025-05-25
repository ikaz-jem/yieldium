import mongoose from "mongoose";
import { connectDb } from "../../db/db";
import { User } from "../../models/user/user";
import { origins } from "../origins";

export async function GET(req, res) {

  let headers = await req.headers
  let origin = await headers.get('origin')
  if (!origins.includes(origin)) {
    await mongoose.disconnect()
    return Response.json({ succes: true, message: 'origin Blocked from the server' }, { status: 401 })
  }

  let apiKey = process.env.API_KEY
  const uiKey = await headers.get('authorization')
  if (apiKey !== uiKey) {
    await mongoose.disconnect()
    return Response.json({ succes: true, message: 'unauthorized' }, { status: 200 })
  }

  await connectDb();
  const address = await headers.get('address');
  const queryWallet = await req.nextUrl.searchParams.get('address')
  if (address) {
    const user = await User.findOne({ address }).select("referredUsers").populate("referredUsers");
    if (!user) return Response.json({ error: "User not found" });
    await mongoose.disconnect()
    return Response.json({ success: true, data: user });
  }
  if (queryWallet) {
    const user = await User.findOne({ address: queryWallet }).select("referredUsers").populate("referredUsers");
    if (!user) return Response.json({ error: "User not found" });
    await mongoose.disconnect()
    return Response.json({ success: true, data: user });
  }


}


