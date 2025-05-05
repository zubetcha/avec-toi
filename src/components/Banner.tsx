"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Swiper 스타일 임포트
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const bannerImages = [
  {
    id: 1,
    src: "/banner1.jpg",
    alt: "웨딩 이미지 1",
    title: "특별한 날을 더 특별하게",
    description: "소중한 결혼식, 아름다운 청첩장으로 기억하세요",
  },
  {
    id: 2,
    src: "/banner2.jpg",
    alt: "웨딩 이미지 2",
    title: "함께하는 소중한 순간",
    description: "여러분의 소중한 순간을 모바일 청첩장으로 전해보세요",
  },
  {
    id: 3,
    src: "/banner3.jpg",
    alt: "웨딩 이미지 3",
    title: "감동을 전하는 청첩장",
    description: "당신만의 스타일로 마음을 전해보세요",
  },
];

export default function Banner() {
  return (
    <div className="relative h-[400px] w-full overflow-hidden bg-slate-50 md:h-[500px]">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
        className="h-full w-full"
      >
        {bannerImages.map((image) => (
          <SwiperSlide key={image.id}>
            <div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${image.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="mx-4 max-w-lg rounded-lg bg-slate-50 p-8 text-center md:p-12">
                <h2 className="mb-2 text-2xl font-bold text-rose-600 md:text-3xl">{image.title}</h2>
                <p className="text-gray-700">{image.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
