import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

export default function Featuresslider() {
  const slides = [
    {
      image: '/assets/images/app.png',
      title: 'Your Crypto, Your Wallet',
      subtitle: 'Non-Custodial & Fully Secure',
      desc: 'With Yieldium, you’re always in control. Our built-in wallet ensures your assets are stored directly in your own address — no third-party custody, ever.'
    },
    {
      image: '/assets/images/slider2.jpg',
      title: 'Hold & Earn, Effortlessly',
      subtitle: 'Native Coins. Real Returns.',
      desc: 'Deposit BNB, TRX, or SOL ... directly into your wallet and start earning up to 2% daily — all powered by our AI-driven trading engine.'
    },
    {
      image: '/assets/images/slider3.jpg',
      title: 'Track, Compound, Withdraw',
      subtitle: 'One Wallet. Infinite Growth.',
      desc: 'Real-time balance updates, compounding options, and weekly withdrawals — all integrated into your personal Yieldium wallet for total transparency.'
    }
  ];

  return (
    <Swiper
      style={{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
      }}
      speed={600}
      autoplay={{ delay: 5000 }}
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Pagination, Navigation, Autoplay]}
      className="mySwiper rounded-2xl"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative h-full w-full bg-cover bg-center rounded-2xl"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="bg-black/60 backdrop-blur-md p-8 rounded-2xl max-w-2xl m-10">
              <div className="title text-white md:text-2xl lg:text-3xl text-xl font-bold mb-2">{slide.subtitle}</div>
              <div className="subtitle text-xl text-primary mb-4">{slide.title}</div>
              <div className="text text-neutral-300">
                <p>{slide.desc}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
