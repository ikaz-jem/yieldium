
import { getServerSession } from 'next-auth';
import dbConnect from '../lib/db';
import DashboardSlider from './components/DashboardSlider/DashboardSlider';
import HeaderMobile from './components/HeaderMobile/HeaderMobile';
import { authOptions } from '../api/auth/[...nextauth]/route';
import User from '../models/userSchema/UserSchema';
import { redirect } from 'next/navigation';
import axios from 'axios';




const symbols = {
  sol: 'SOLUSDT',
  bnb: 'BNBUSDT',
  tron: 'TRXUSDT',
  ton: 'TONUSDT',
  usdt:'usdt'
};




async function getUserData() {
  "use server"
  const session =await getServerSession(authOptions)

  if (!session) return null;

  await dbConnect()
  const userDoc = await User.findById({_id:session.user.id })
    .populate('deposits') // or pass second arg to populate specific fields
    .populate('balances')
    .populate('referredUsers');
    
  const userData = JSON.parse(JSON.stringify(userDoc))

  let totalValue = 0
  userData.balances = await Promise.all(
  userData.balances.map(async (balance) => {
   if (balance?.currency !== "usdt"){
     const price = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbols[balance?.currency]}`).then((res) => Number(res.data?.price))
     totalValue += (balance.amount * price)
     return {
        ...balance.toObject?.() ?? balance, // if it's a Mongoose doc
        convertedAmount: balance.amount * price,
      };
    
   }
   if (balance?.currency == "usdt"){
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

  const coinDetails = {
    sol: '/assets/images/crypto/solana.svg',
    bnb: '/assets/images/crypto/bnb.svg',
    usdt:'/assets/images/crypto/usdt.svg'

  }



  return (
    <div className='w-full  max-w-lg mx-auto'>
      <HeaderMobile userData={data || {}} />
      <div className='w-full z-0  '>
        <DashboardSlider data={data} />

        <div className='flex flex-col gap-5 p-5'>

          <h1 >Balances</h1>

          {

            data?.balances?.map((balance, idx) => <div key={idx} className='flex  gap-5 items-center'>

              <img src={coinDetails[balance?.currency]} alt="" className='w-10 h-10' />
              <div className='w-full flex justify-between'>

              <div className='flex flex-col '>
                <h1>{balance?.currency.toUpperCase()}</h1>
                <p className='text-xs'>{parseFloat((balance?.amount).toFixed(2))} {balance?.currency.toUpperCase()}</p>
                {/* <p className='text-xs'>{balance?.prices[balance?.currency]}$</p> */}

              </div>
                <p className='text-sm'>{parseFloat((balance?.convertedAmount).toFixed(2) ) + ' $'} </p>
              </div>
            </div>
            )
          }

        </div>
      </div>
    </div>
  )
}
