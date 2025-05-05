import ButtonPrimary from "../components/ButtonPrimary"


export default function Hero() {

    function Navbar() {


        return <div className="w-full flex items-center justify-between py-5 px-5  ">
            <div className="flex items-center gap-2 ">
                <img src="/assets/images/logo.png" alt="" className="rounded-full h-10 w-10" />
                <p className="font-bold !text-title tracking-wide text-xl">Yieldium</p>
            </div>

            <ul className="flex gap-5">
                <li className="cursor-pointer hover:text-primary">Home</li>
                <li className="cursor-pointer hover:text-primary">About</li>
                <li className="cursor-pointer hover:text-primary">Features</li>
                <li className="cursor-pointer hover:text-primary">FAQ</li>
            </ul>
            <ButtonPrimary>Log In</ButtonPrimary>

        </div>
    }



    return (
        <div className="h-[100vh] relative snap-center ">
                        <span className="bg-purple-500 rounded-full h-[600px] w-[600px] blur-[400px] absolute -top-80 left-[35%] z-[-1] opacity-40"></span>
            <span className="bg-primary rounded-full w-[600px] h-[600px] absolute -top-10 -left-40 blur-[300px] opacity-20 "/>
            <div className="container  ">
                <Navbar />
            </div>
            {/* <img src="/assets/images/divider.png" alt="" className="w-screen" /> */}

        </div>

    )
}