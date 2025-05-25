'use server';

import Deposit from '@/app/models/depositSchema/depositSchema';
import { revalidatePath } from 'next/cache';
import dbConnect from '@/app/lib/db';
import User from '@/app/models/userSchema/UserSchema';
import Balance from '@/app/models/balanceSchema/balanceSchema';

export async function depositFunds(deposit) {
  console.log('Recording deposit to database...');
  const { user, address, currency, amount } = deposit;

  try {
    await dbConnect();

    const normalizedCurrency = currency.toLowerCase();

    const deposited = await Deposit.findOneAndUpdate(
      { user, address, amount, currency },
      { $set: deposit },
      { upsert: true, new: true }
    );

    if (!deposited) {
      console.error('Failed to upsert deposit.');
      return { status: 'error', error: 'Deposit upsert failed.' };
    }

    await User.findByIdAndUpdate(user, {
      $addToSet: { deposits: deposited._id }
    });

    if (deposited.status === 'credited') {
      const balanceDoc = await Balance.findOneAndUpdate(
        { user, currency: normalizedCurrency },
        { $inc: { amount } },
        { upsert: true, new: true }
      );

      if (!balanceDoc) {
        console.error('Failed to upsert balance.');
        return { status: 'error', error: 'Balance upsert failed.' };
      }

      await User.findByIdAndUpdate(user, {
        $addToSet: { balances: balanceDoc._id }
      });
    }

    console.log('✅ Deposit recorded:', deposited._id);
    revalidatePath('/dashboard/deposit');
    return { status: 'success', depositId: deposited._id.toString() };
  } catch (error) {
    console.error('❌ Failed to record deposit:', error);
    return { status: 'error', error };
  }
}
