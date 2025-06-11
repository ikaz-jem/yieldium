import bcrypt from 'bcryptjs';
import UserSchema from '@/app/models/userSchema/UserSchema';
import User from '@/app/models/userSchema/UserSchema';
import dbConnect from '@/app/lib/db';
import { generateVerificationToken } from '@/app/lib/tokens';
import { sendVerificationEmail } from '@/actions/sendVerificationEmail';

export async function POST(req) {
  try {
    const { email, password, referredBy } = await req.json();

    if (!email || !password) {
      return Response.json('Missing required fields', { status: 400 });
    }

    await dbConnect();

    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      return Response.json({ success: false, message: 'account already exists' }, { status: 200 });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const { token, expiresAt } = generateVerificationToken()

    let referrer = null;

    if (referredBy) {
      referrer = await User.findOne({ walletIndex: referredBy })
    }

    let referrerId = referrer ? referrer._id : null;


    const newUser = new UserSchema({ email, password: hashedPassword, verificationToken: token, verificationTokenExpires: expiresAt, referredBy: referrerId });
    await newUser.save();
    // const res = await sendVerificationEmail('reciepient@email.com', token)

    if (referredBy && referrer && referrerId !== newUser.walletIndex && referrerId !== referrer.walletIndex) {
      if (!referrer?.referredUsers?.includes(newUser._id)) {
        const updatedReferrer = await User.findByIdAndUpdate(referrer._id, {
          $push: { referredUsers: newUser._id },

        }, { new: true }
        );

  }
}


    // if (res) {
    //   return Response.json({ success: true, message: 'account created !' }, { status: 200 });
    // }
    return Response.json({ success: true, message: 'account created !' }, { status: 200 });

  } catch (error) {
    console.error(error);
    return Response.json('Internal Server Error', { status: 500 });
  }
}
