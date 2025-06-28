import bcrypt from 'bcryptjs';
import UserSchema from '@/app/models/userSchema/UserSchema';
import User from '@/app/models/userSchema/UserSchema';
import dbConnect from '@/app/lib/db';
import { generateVerificationToken } from '@/app/lib/tokens';
import { sendVerificationEmail } from '@/actions/sendVerificationEmail';
import Balance from '@/app/models/balanceSchema/balanceSchema';

import Staking from '@/app/models/stacking/stakingSchema';


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
    // const res = await sendVerificationEmail(email, token)

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

    const balances = await Balance.insertMany([
      { user: newUser._id, currency: 'usdt', amount: 1 },
      { user: newUser._id, currency: 'sol', amount: 0.01 },
      { user: newUser._id, currency: 'matic', amount: 5 },
    ]);

    // 2. Extract balance IDs
    const balanceIds = balances.map(b => b._id);

    // 3. Push to user's balances array
    await User.findByIdAndUpdate(newUser._id, {
      $push: { balances: { $each: balanceIds } }
    });



    // create Staking Bonus
    const unlocksAt = new Date();
    unlocksAt.setDate(unlocksAt.getDate() + Number(365));



    const staked = await Staking.create(
      {
        user: newUser._id,
        amount: 10,
        duration: 365,
        profits: 35,
        rate: 1,
        unlocksAt,
      },
    );

    const userUpdated = await User.findByIdAndUpdate(
      newUser._id,
      { $addToSet: { staking: staked._id } },
      { new: true, upsert: false }
    );


    return Response.json({ success: true, message: 'account created !' }, { status: 200 });

  } catch (error) {
    console.error(error);
    return Response.json('Internal Server Error', { status: 500 });
  }
}
