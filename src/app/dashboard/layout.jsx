import DashboardNavMobile from './components/DashboardNavMobile/DashboardNavMobile';
import DashboardHeaderMobile from './components/DashboardHeaderMobile/DashboardHeaderMobile';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import DashboardNav from './components/DahsboardNav/DashboardNav';


export default async function DashboardLayout({ children }) {

    const session = await getServerSession(authOptions)
    // const cookieStore =await cookies();
    //   const token =  cookieStore.get('path')
    return (
        <div className=' h-full overflow-hidden   flex justify-between items-center flex-col  bg-gradient-to-b from-primary/20 to-transparent from-1% to-20% ' >
            <div className='bg-[url(/assets/images/3.png)] bg-contain bg-no-repeat bg-center w-[80vw] h-screen absolute top-0 z-[-1] grayscale-40 opacity-60 mask-b-from-0 mix-blend-color-overlay animate-pulse'>
            </div>
            <div className=' space-y-5 container p-5 pb-20 '>
                {/* <DashboardNav session={session} /> */}
                <DashboardHeaderMobile session={session} />
                {children}
            </div>
            <DashboardNavMobile />
        </div>
    )
}
