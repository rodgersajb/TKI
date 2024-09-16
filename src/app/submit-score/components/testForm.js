"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/swiper-bundle.css";

export default function TestForm({ sixFootGolf, quarryGolf }) {
  return (
    <>
      <form>
        <Swiper slidesPerView={1}>
            {sixFootGolf.holes.map((hole, index) => {
                return (
                    <SwiperSlide key={index}>
                        <label>
                            <input type="number" name={`sixFootGolf-${hole.number}`} />
                            <span>{hole.number}</span>
                        </label>
                    </SwiperSlide>
                )
            })}

        </Swiper>

      </form>
    </>
  );
}
