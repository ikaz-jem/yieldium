"use client"
import BrandsSlider from "./components/BrandsSlider/BrandsSlider"
import Counter from './Counter'


export default function Hero() {






    return (
        <div className="h-[100vh] relative snap-center ">
            <span className="bg-purple-500 rounded-full h-[600px] w-[600px] blur-[400px] absolute -top-80 left-[35%] z-[-1] opacity-40"></span>
            <span className="bg-primary rounded-full w-[600px] h-[600px] absolute -top-10 -left-40 blur-[300px] opacity-20 " />
            <div className="container  ">

            </div>
            <div className="absolute bottom-0 w-full">
                <div className="container mx-auto pb-20  ">
                    <div className="w-full h-max bg-forground space-y-5">
                        <Counter launchDate="2025-06-25T00:00:00" />
                        <BrandsSlider />
                    </div>
                </div>
            </div>
        </div>

    )
}