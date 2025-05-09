"use server"

import dbConnect from "@/app/lib/db"
import { generateVerificationToken } from "@/app/lib/tokens"
import UserSchema from "@/app/models/userSchema/UserSchema"
import { resetPasswordEmail } from "./resetPasswordEmail"

export async function ResetPasswordVerification (email){
await dbConnect()

const user = UserSchema.findOne({email})

if (user){
    const newCode = generateVerificationToken()
    const data = await resetPasswordEmail(email,newCode)
if (data){
    return {success:true,message:"An Email Has Been Sent"}
}

}else {
 return
}

}