
import { getServerSession } from 'next-auth';
import dbConnect from '../lib/db';
import HeaderMobile from './components/HeaderMobile/HeaderMobile';
import { authOptions } from '../api/auth/[...nextauth]/route';
import User from '../models/userSchema/UserSchema';
import axios from 'axios';
import AssetsBalance from './components/AssetsBalance/AssetsBalance';
import DashboardInvestments from './components/DashboardInvestments/DashboardInvestments';
import { Suspense } from 'react';
import { ClipLoader } from 'react-spinners'
import AssetDistributionChart from './components/charts/AssetsDistribution';

const symbols = {
  sol: 'SOLUSDT',
  eth: 'ETHUSDT',
  bnb: 'BNBUSDT',
  tron: 'TRXUSDT',
  ton: 'TONUSDT',
  usdt: 'usdt',
  matic:'MATICUSDT',
};    

async function getUserData() {
  "use server"
  const session = await getServerSession(authOptions)

  if (!session) return null;

  await dbConnect()
  const userDoc = await User.findById({ _id: session.user.id })
    .populate('deposits') // or pass second arg to populate specific fields
    .populate('balances')
    .populate('referredUsers')
    .populate("staking",);

  const userData = JSON.parse(JSON.stringify(userDoc))

  let totalValue = 0
  userData.balances = await Promise.all(
    userData.balances.map(async (balance) => {
      if (balance?.currency !== "usdt") {
        const price = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbols[balance?.currency]}`).then((res) => Number(res.data?.price))

        totalValue += (balance.amount * price)
        return {
          ...balance.toObject?.() ?? balance, // if it's a Mongoose doc
          convertedAmount: balance.amount * price,
        };
      }
      if (balance?.currency == "usdt") {
        totalValue += balance.amount
        return {
          ...balance.toObject?.() ?? balance, // if it's a Mongoose doc
          convertedAmount: balance.amount,
        };
      }
    })
  );

  userData.balances.sort((a, b) => b.convertedAmount - a.convertedAmount);
  userData.totalValue = totalValue
  return userData
}


export default async function MobileDashboard() {

  const data = await getUserData()

  return (
    <div className='w-full  space-y-0   '  >
      <Suspense fallback={<div className='w-full space-y-5 flex items-center justify-center  h-40'>
        <ClipLoader className='text-xs' color='var(--title)' size={25} />
      </div>} >
        <HeaderMobile userData={data || {}} />
        <div className='w-full z-0  flex flex-col gap-5 md:flex-row'>
          <AssetDistributionChart user={data} />
          <AssetsBalance data={data} />
          <DashboardInvestments data={data} />
        </div>
      </Suspense>
    </div>
  )
}
