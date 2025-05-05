import SectionBento from "./components/SectionBento";
import Hero from "./Hero";
import SectionFaq from "./SectionFaq";
import SectionFeatures from "./SectionFeatures";
import SectionHowItWorks from "./SectionHowItWorks";
import { Scroll } from "@react-three/drei";



export default function HomePage() {


    return (
        <>
                <div className="!w-screen h-full overflow-x-hidden scroll-smooth snap-y  relative ">
                    <Hero />
                    <SectionFeatures />
                    <SectionBento />
                    <SectionHowItWorks />
                    <SectionFaq />
                </div>
        </>
    )
}