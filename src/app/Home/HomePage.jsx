import SectionBento from "./components/SectionBento";
import Footer from "./Footer";
import Hero from "./Hero";
import SectionCta from "./SectionCta";
import SectionFaq from "./SectionFaq";
import SectionFeatures from "./SectionFeatures";
import SectionHowItWorks from "./SectionHowItWorks";
import { Scroll } from "@react-three/drei";



export default function HomePage() {


    return (
        <>
                <div className="!w-screen h-full scroll-smooth  relative ">
                    <Hero />
                    <SectionFeatures />
                    <SectionBento />
                    <SectionHowItWorks />
                    <SectionCta />
                    {/* <SectionFaq /> */}
                    <Footer />
                </div>
        </>
    )
}