"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import toast from "react-hot-toast";

export default function TestForm({ sixFootGolf, quarryGolf }) {
  // useState to keep track of score
  const [score, setScore] = useState(0);

  const swiperRef = useRef(null);

  // Handlers for buttons
  const handleNextSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
      console.log(swiperRef.current.swiper, "swiperRef");
    }
  };

  const handlePrevSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
      console.log(swiperRef.current.swiper, "swiperRef");
    }
  };

  // function to handle score input
  const handleScoreChange = (holeNumber, value) => {
    setScore({
      ...score,
      [holeNumber]: value,
    });
    console.log(score, "score");
  };
  // function to handle score submission
  const handleSubmit = async () => {
    // fetch to submit scores
    const res = await fetch("http://localhost:3000/api/scores", {
      method: "POST",
      body: JSON.stringify({
        course: sixFootGolf.name,
        score,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      toast.success("Score submitted successfully!");
    } else {
      toast.error("Failed to submit score.");
    }
  };

  return (
    <>
      <form className="flex flex-col">
        <h2>{sixFootGolf.name}</h2>
        <Swiper
          ref={swiperRef}
          slidesPerView={1}
          navigation={false}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          style={{ width: "100%", height: "500px" }}
        >
          {sixFootGolf.holes.map((hole, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="text-kobePurple">
                  <h3 className="text-kobePurple">Hole #{hole.number}</h3>
                  <p>Par: {hole.par}</p>
                  <p>Handicap: {hole.handicap}</p>
                  <p>Yardage: {hole.yardage}</p>
                  <label htmlFor="score">Score:</label>
                  <input
                    type="number"
                    name="score"
                    required
                    placeholder={hole.par}
                    defaultValue={hole.par}
                    value={score[hole.number]}
                    onChange={(e) => handleScoreChange(e.target.value)}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="flex justify-between px-1">
          <button
            className="bg-kobePurple text-kobeWhite py-1 px-2 rounded-lg"
            type="button"
            onClick={handlePrevSlide}
          >
            Previous Hole
          </button>
          <button
            className="bg-kobePurple text-kobeWhite py-1 px-2 rounded-lg"
            type="button"
            onClick={handleNextSlide}
          >
            Next Hole
          </button>
        </div>
        <button onClick={handleSubmit}>Submit score</button>
      </form>
    </>
  );
}
