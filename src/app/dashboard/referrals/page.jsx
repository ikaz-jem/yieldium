'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { IoMdCopy } from "react-icons/io"
import { toast } from "sonner"
import { getReferrals } from "@/actions/getReferrals"
import { IoPersonAdd } from "react-icons/io5";

export default function ReferralPage() {
  const { data: session } = useSession()
  const [userData, setUserData] = useState(null)

  const user = session?.user
  const userId = session?.user?.id
  const referralLink = typeof window !== "undefined" && userId ? `${window.location.origin}/register?id=${user?.walletIndex}` : ""


  async function getData() {
    let data = await getReferrals(userId)
    setUserData(data)
  }

  useEffect(() => {
    if (userId) {
      getData()
    }
  }, [userId])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
    toast.success("Referral link copied!")
  }

  return (

    <div className="flex flex-col md:flex-row gap-5  ">
      <div className="p-5 mx-auto space-y-5 w-full backdrop-blur-xl bg-card rounded">
        <div className="flex flex-col justify-center gap-1">
          <h1 className="text-2xl font-semibold">Community Program</h1>
          <p className=" text-xs !text-primary">Get 7% from each Deposit made by Your Community !</p>
        </div>
        <div className="bg-white/10 p-3 rounded-lg flex justify-between items-center">
          <p className="text-sm break-all">{referralLink}</p>
          <button onClick={copyToClipboard}>
            <IoMdCopy className="text-lg" />
          </button>
        </div>

        {userData?.referredUsers.length>0 ? (
          <div className="space-y-3">
            <p><strong>Total Referrals:</strong> {userData?.referredUsers?.length || 0}</p>
            <div>
              <h2 className="font-semibold text-sm mb-2">Referred Users:</h2>
              <ul className="text-sm space-y-1">
                {userData?.referredUsers.map((user, i) => (
                  <li key={i} className="bg-white/5 rounded p-5">• {user.email.slice(0, 4, user.email.length)} *** @{user.email.split('@')[1]}</li>
                ))}
              </ul>
            </div>
          </div>
        ):

        <div className="space-y-3">
          <div>
            <ul className="text-sm space-y-1">

              <li className="bg-white/5 rounded p-5 w-full space-y-2">
                <div className="flex items-center gap-2 ">
                  <p className={`!text-lg truncate '`}>Start Referring Others To Earn 7% Of their Deposits !</p>
                </div>
              </li>

            </ul>
          </div>
        </div>
      
      
      }
      </div>

      <div className="p-5 mx-auto space-y-5 w-full backdrop-blur-xl bg-card rounded">
        <div className="flex flex-col justify-center gap-1">
          <h1 className="text-2xl font-semibold">Bonus History</h1>
          <p className=" text-xs !text-primary">Profits Are credited Automatically to yieldium Wallet</p>
        </div>

        {userData?.deposits?.filter((deposit) => deposit.depositType == "Referral bonus").length > 0 ? (
        <div className="space-y-3">
          <div>
            <ul className="text-sm space-y-1">
              {userData?.deposits?.filter((deposit) => deposit.depositType == "Referral bonus").map((bonus, i) => (
                <li key={i} className="bg-white/5 rounded p-5 w-full space-y-2">
                  <div className="flex items-center gap-2 ">
                    <IoPersonAdd className='text-neutral' />
                    <p className={`!text-xs truncate '`}>{bonus?.depositType || ''}</p>
                  </div>
                  <p className={`!text-sm truncate !text-green-500 '`}> • {parseFloat(Number(bonus.amount.toFixed(4)))} {bonus?.currency}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        )
        :

        (<div className="space-y-3">
          <div>
            <ul className="text-sm space-y-1">

              <li className="bg-white/5 rounded p-5 w-full space-y-2">
                <div className="flex items-center gap-2 ">
                  <p className={`!text-xl truncate '`}>Nothing Yet !</p>
                </div>
              </li>

            </ul>
          </div>
        </div>)
      
        }
      </div>
    </div>
  )
}
