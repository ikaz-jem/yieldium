"use server";

import User from "@/app/models/userSchema/UserSchema";
import dbConnect from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getReferrals(userId) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false, message: 'access denied' };
  }

  await dbConnect();

const user = await User.findOne({ _id: userId })
  .select("-password") // ✅ Exclude password, keep other fields
  .populate({
    path: ["referredUsers","deposits"],
    select: "-password"
  });


  if (!user) {
    return { success: false, message: 'User not found' };
  }

  const userData = JSON.parse(JSON.stringify(user));
  return userData
}
