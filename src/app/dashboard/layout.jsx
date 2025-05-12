import DashboardNavMobile from './components/DashboardNavMobile/DashboardNavMobile';
import DashboardHeaderMobile from './components/DashboardHeaderMobile/DashboardHeaderMobile';

export default function DashboardLayout({ children }) {
    // const cookieStore =await cookies();
    //   const token =  cookieStore.get('path')
    return (
        <div className=' h-full   flex justify-between items-center flex-col  bg-gradient-to-b from-primary/20 to-transparent from-1% to-20% ' >
            <div className='bg-[url(/assets/images/3.png)] bg-contain bg-no-repeat bg-center w-screen h-screen absolute top-0 z-[-1] grayscale-40 opacity-20 mask-b-from-0 blur-xs'>
            </div>
            <div className=' space-y-5 w-full p-5  '>
                <DashboardHeaderMobile />
                {children}
            </div>
            <DashboardNavMobile />
        </div>
    )
}
