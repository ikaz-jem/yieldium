import dbConnect from "@/app/lib/db"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import StakingPreview from "./StakingPreview"


async function getContracts() {
    "use server"
    const session = await getServerSession(authOptions)
    if (!session?.user) return { success: false, message: 'Access denied !' }

    await dbConnect()
    const Staking = (await import('@/app/models/stacking/stakingSchema')).default
    const contracts = await Staking.find({ user: session.user.id }).sort({ createdAt: -1 });

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

       <StakingPreview contracts={contracts} />
    )
}
