import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import BalanceChart from '../charts/BalanceChart';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';
import ActivityChart from '../charts/ActivityChart.';
import GrowthChart from '../charts/growthchart';

export default function App() {
  return (
    <>
      <Swiper  slidesPerView={'auto'}
        centeredSlides={true}
        spaceBetween={30} pagination={true} modules={[Pagination]} className=" flex gap-5 !z-0">
        <SwiperSlide>
          <BalanceChart/>
          </SwiperSlide>
        <SwiperSlide>
          <ActivityChart/>
          </SwiperSlide>
        <SwiperSlide>
          <GrowthChart/>
          </SwiperSlide>
       
      </Swiper>
    </>
  );
}

