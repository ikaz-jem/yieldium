import { FaTelegram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import BrandsSlider from "./components/BrandsSlider/BrandsSlider";


export default function Footer() {
  return (
    <div className="h-[100vh] flex flex-col justify-between backdrop-blur-xs grayscale-50">

      <div className="w-full h-full pt-30 px-5 flex flex-col gap-5  sepia-100">

       
            <h1 className='text-3xl md:text-8xl tracking-widest font-bold ' >Join The Comunity </h1>
            <h1 className=' tracking-widest font-bold  w-[50%]' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus nobis autem tempore animi placeat cum perspiciatis quibusdam! Placeat, excepturi eaque culpa voluptatibus a qui, ea quae, fuga ad delectus nesciunt. </h1>

      </div>


      <div className="w-full   bg-neutral-900 p-10">
        <div className="flex justify-between items-center">

          <div className='space-y-3 '>
            <h1 className='text-3xl md:text-5xl tracking-widest font-bold ' >Building A Better </h1>
            <h1 className='text-3xl md:text-5xl font-light tracking-widest !text-primary ' >Financial Future </h1>
          </div>



          <div className="flex gap-5 grayscale-0">
            <FaSquareXTwitter className="text-4xl text-neutral cursor-pointer hover:text-primary transition-all" />
            <FaTelegram className="text-4xl text-neutral cursor-pointer hover:text-primary transition-all" />
          </div>


        </div>
        <BrandsSlider />

      </div>
    </div>
  )
}
