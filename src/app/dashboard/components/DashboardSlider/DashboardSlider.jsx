import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';

export default function App() {
  return (
    <>
      <Swiper  slidesPerView={'auto'}
        centeredSlides={true}
        spaceBetween={30} pagination={true} modules={[Pagination]} className=" flex gap-5 !z-0">
        <SwiperSlide><div className="w-full h-60  rounded-xl bg-gradient-to-tr from-primary/20 to-primary/5"></div></SwiperSlide>
        <SwiperSlide><div className="w-full h-60 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-xl bg-[url(/assets/images/sphere.png)] bg-cover "></div></SwiperSlide>
        <SwiperSlide><div className="w-full h-60 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-xl"></div></SwiperSlide>
        <SwiperSlide><div className="w-full h-60 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-xl"></div></SwiperSlide>
        <SwiperSlide><div className="w-full h-60 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-xl"></div></SwiperSlide>
        <SwiperSlide><div className="w-full h-60 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-xl"></div></SwiperSlide>
        <SwiperSlide><div className="w-full h-60 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-xl"></div></SwiperSlide>
        <SwiperSlide><div className="w-full h-60 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-xl"></div></SwiperSlide>
        <SwiperSlide><div className="w-full h-60 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-xl"></div></SwiperSlide>
        <SwiperSlide><div className="w-full h-60 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-xl"></div></SwiperSlide>
      </Swiper>
    </>
  );
}

