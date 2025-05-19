'use server';

import Deposit from '@/app/models/depositSchema/depositSchema';
import { revalidatePath } from 'next/cache'; // or 'next/headers' if you're using route handlers
import dbConnect from '@/app/lib/db';



export async function depositFunds(deposit) {
console.log('recording deposit to database ....')
let { user,address,currency,amount} = deposit
  try {
    await dbConnect()
    // Optional: Check if a deposit already exists for this address and amount to prevent duplication
    const deposited = await Deposit.findOneAndUpdate({ user,address, amount ,currency},
        {
      ...deposit,
        }, { upsert: true, new: true }
     );

    console.log('✅ Deposit recorded:', deposit._id , deposited);    
    revalidatePath('/dashboard/deposit');
    return { status: 'success', depositId: deposit._id };
} catch (error) {
    console.error('❌ Failed to record deposit:', error);
    return { status: 'error', error };
}
}
