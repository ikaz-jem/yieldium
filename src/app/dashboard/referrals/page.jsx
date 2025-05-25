'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { IoMdCopy } from "react-icons/io"
import { toast } from "sonner"
import { getReferrals } from "@/actions/getReferrals"

export default function ReferralPage() {
  const { data: session } = useSession()
  const [userData, setUserData] = useState(null)

  const user = session?.user
  const userId = session?.user?.id
  const referralLink = typeof window !== "undefined" && userId ? `${window.location.origin}/register?id=${user?.walletIndex}` : ""

  console.log(userData)

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
    <div className="p-5 max-w-xl mx-auto space-y-5">
      <h1 className="text-xl font-bold">Referral Program</h1>
      <div className="bg-white/10 p-3 rounded-lg flex justify-between items-center">
        <p className="text-sm break-all">{referralLink}</p>
        <button onClick={copyToClipboard}>
          <IoMdCopy className="text-lg" />
        </button>
      </div>
      {userData?.referredUsers && (
        <div className="space-y-3">
          <p><strong>Total Referrals:</strong> {userData?.referredUsers?.length || 0}</p>
          <p><strong>Earnings:</strong> {userData?.balance?.toFixed(2)} USDT</p>
          <div>
            <h2 className="font-semibold text-sm mb-2">Referred Users:</h2>
            <ul className="text-sm space-y-1">
              {userData?.referredUsers.map((user, i) => (
                <li key={i}>• {user.email}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
