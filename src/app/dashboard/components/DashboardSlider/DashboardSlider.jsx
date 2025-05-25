"use client"
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
import AssetDistributionChart from '../charts/AssetsDistribution';
import DepositHistoryChart from '../charts/DepositHistoryChart';

export default function App({data}) {

  return (
    <>
      <Swiper slidesPerView={'auto'}
        centeredSlides={true}
        spaceBetween={30} pagination={true} modules={[Pagination]} className=" flex gap-5 !z-0">
        <SwiperSlide>
          <AssetDistributionChart user={data} />
        </SwiperSlide>
        <SwiperSlide>
          <DepositHistoryChart user={data} />
        </SwiperSlide>
        <SwiperSlide>
          <BalanceChart />
        </SwiperSlide>
        <SwiperSlide>
          <ActivityChart />
        </SwiperSlide>


      </Swiper>
    </>
  );
}

