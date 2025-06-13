import dbConnect from "@/app/lib/db"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import { formatISO } from "@/app/utils/formatISO";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import ButtonSecondary from "@/app/components/ButtonSecondary";
import { timeLeft } from "@/app/utils/timeLeft";
import ForceUnlockModal from "./ForcUnlockModal";
import BorderEffect from "../components/BorderEffect/BorderEffect";
import { revalidatePath } from "next/cache";

async function getContracts() {
    "use server"
    const session = await getServerSession(authOptions)
    if (!session?.user) return { success: false, message: 'Access denied !' }

    await dbConnect()
    const Staking = (await import('@/app/models/stacking/stakingSchema')).default
    const contracts = await Staking.find({ user: session.user.id ,claimed:true}).sort({ createdAt: -1 });

    if (!contracts) {
        return { success: false, message: 'No available Investments' }
    }
    let data = await JSON.parse(JSON.stringify(contracts))
    return { succes: true, contracts: data }
}



export default async function page() {
    const { contracts } = await getContracts()

    if (contracts?.length == 0) {
        return (
            <div className="w-full h-full">
                <h1 className="text-3xl ">Nothing To show</h1>
            </div>
        )
    }

    return (

        <div className="grid gap-5">
            <div className="flex items-center justify-between">

                <h1 className="!text-neutral text-sm" >Investments</h1>
            </div>
            <div className='flex gap-5 flex-wrap   w-full '>
                {contracts?.map((contract, idx) =>
                    <div key={idx} className='flex flex-col max-w-xl w-full gap-2 border border-primary/10 p-5 bg-card rounded backdrop-blur-xl relative overflow-hidden '>
                            <BorderEffect/>

                        <div className='flex  gap-5 items-center '>

                            <img src='/assets/images/crypto/usdt.svg' alt="" className='w-8 h-8' />
                            <div className='w-full flex justify-between'>
                                <div className='flex flex-col '>
                                    <h1>Tether</h1>
                                    <p className='text-xs'>{parseFloat((contract?.amount).toFixed(2))} USDT</p>
                                    {/* <p className='text-xs'>{balance?.prices[balance?.currency]}$</p> */}
                                </div>
                                <p className='text-sm !text-green-500'>{parseFloat((contract?.profits).toFixed(2)) + ' $'} </p>
                            </div>
                        </div>

                        <div className="flex justify-between ">
                            <p className='text-sm'>{timeLeft(contract.unlocksAt)} </p>
                            <p className='text-md !text-red-500 font-bold'>{contract.claimed && "Claimed"} </p>
                        </div>


                        <div className="flex justify-between ">

                            <p className='text-sm'>{formatISO(contract.unlocksAt)} </p>
                            <div className="flex items-center gap-2">
                                <p className='text-sm'>{contract.duration} days </p>

                                {
                                    contract?.isLocked ?
                                    <FaLock className="text-yellow-500" />
                                    :
                                    <FaUnlock className="text-yellow-500" />
                                }

                            </div>
                        </div>

                        <div className="flex gap-2">
                            <ButtonPrimary disabled >Claim</ButtonPrimary>
                            <ForceUnlockModal contract={contract} />
                        </div>

                    </div>
                )
            }


            </div>
            <p className='text-sm'>Using Force Unlock to Withdraw Before Time will Apply 25% Fees instead Of 1 USDT </p>
        </div>
    )
}
