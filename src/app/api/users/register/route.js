import bcrypt from 'bcryptjs';
import UserSchema from '@/app/models/userSchema/UserSchema';
import dbConnect from '@/app/lib/db';
import { generateVerificationToken } from '@/app/lib/tokens';
import { sendVerificationEmail } from '@/app/lib/emailSenders';
import { signIn } from 'next-auth/react';

export async function POST(req) {
  try {
    const {email, password } = await req.json();

    if (!email || !password) {
      return Response.json('Missing required fields', { status: 400 });
    }

    await dbConnect();

    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      return Response.json({success:false,message:'account already exists'}, { status: 200 });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const {token,expiresAt} = generateVerificationToken()


    // const newUser = new UserSchema({ email, password: hashedPassword,verificationToken:token,verificationTokenExpires:expiresAt });
    // await newUser.save();


      // const res = await sendVerificationEmail('h',token)


      return Response.json({success:true , message:'account created !'}, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json('Internal Server Error', { status: 500 });
  }
}
