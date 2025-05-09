"use server"

import dbConnect from "@/app/lib/db"
import UserSchema from "@/app/models/userSchema/UserSchema"
import { isUuid } from "uuidv4";

export async function verifyEmailByToken(token) {
  await dbConnect();

  if (!token) {
    throw new Error('Token is required');
  }

  const user = await UserSchema.findOne({ verificationToken: token });

  const validId = isUuid(token)
  if (!validId){
    return { success: false, message: 'Invalid verification token.' };
  }

  if (!user) {
    return { success: false, message: 'Invalid or Expired verification token.' };
  }

  const isExpired = user.verificationTokenExpires < new Date();
  if (isExpired) {
    return {
      success: false,
      message: 'Verification Code Expired',
      resent: true,
      email:user.email || true
    };
  } else {
    user.verified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();
    return { success: true, message: 'Email verified successfully ! ' };
  }

}