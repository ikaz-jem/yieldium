import { Suspense } from "react";
import SectionBento from "./components/SectionBento";
import Footer from "./Footer";
import Hero from "./Hero";
import SectionFaq from "./SectionFaq";
import { lazy } from "react";
import Featuresslider from "./components/Featuresslider/Featuresslider";


const SectionFeatures = lazy(() => import('./SectionFeatures'))
const SectionHowItWorks = lazy(() => import('./SectionHowItWorks'))
const SectionCta = lazy(() => import('./SectionCta'))
const SectionFeatures2 = lazy(() => import('./SectionFeatures2'))


export default function HomePage() {


    return (
        <>
                <div className="!w-screen h-full  relative ">
                    <Hero />
                    <Suspense fallback='loading'>
                    <SectionFeatures />
                    <SectionFeatures2 />
                    <SectionBento />
                    <div className='h-[100vh] relative   '>
                    <Featuresslider />
                         
                        </div>
                    
                    <SectionHowItWorks />
                    <SectionCta />
                    </Suspense>
                    <Footer />
                    {/* <SectionFaq /> */}
                </div>
        </>
    )
}