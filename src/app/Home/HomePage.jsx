import Footer from "./Footer";
import Hero from "./Hero";
import { lazy } from "react";
// import SectionFaq from "./SectionFaq";
// import { Suspense } from "react";
// import Featuresslider from "./components/Featuresslider/Featuresslider";
// import SectionBento from "./components/SectionBento";


// const SectionFeatures = lazy(() => import('./SectionFeatures'))
// const SectionHowItWorks = lazy(() => import('./SectionHowItWorks'))
// const SectionCta = lazy(() => import('./SectionCta'))
// const SectionFeatures2 = lazy(() => import('./SectionFeatures2'))
// const SectionCalculator = lazy(() => import('./SectionCalculator'))


export default function HomePage() {


    return (
        <>
            <div className="!w-screen h-full  relative ">
                <Hero />
                {/* <Suspense fallback='loading'>
                    <SectionFeatures />
                    <SectionFeatures2 />
                    <SectionBento />
                    <div className='h-[100vh] '>
                        <Featuresslider />
                    </div>
                    <SectionHowItWorks />
                    <SectionCta />
                    <SectionCalculator />
                </Suspense> */}
                <Footer />
                {/* <SectionFaq /> */}
            </div>
        </>
    )
}