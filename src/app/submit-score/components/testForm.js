"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import toast from "react-hot-toast";

import Link from "next/link";

import { addScore } from "@/app/actions/actions";

import SubmitButton from "./submitButton";

export default function TestForm({ sixFootGolf, user, kindeId }) {
 
  // useState to keep track of score
  const [score, setScore] = useState(
    sixFootGolf.holes.reduce((acc, hole) => {
      acc[hole.number] = "";
      return acc;
    }, {})
  );

  const [currentHole, setCurrentHole] = useState(1); // Keep track of current hole
  const [totalScore, setTotalScore] = useState(0);
  const [holeScores, setHoleScores] = useState({}); // Store scores for each hole

  const swiperRef = useRef(null);
  const ref = useRef(null);

  // Handlers for buttons
  const handleNextSlide = async (e) => {
    e.preventDefault();
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
      console.log(swiperRef.current.swiper, "swiperRef");

      const formData = new FormData(ref.current);
      formData.append("course", sixFootGolf.name);
      formData.append("holeScore", score);
      formData.append("holeNumber", swiperRef.current.swiper.activeIndex + 1);
      console.log(formData, "formData");
      try {
        await addScore(formData);
        
        if (currentHole < sixFootGolf.holes.length) {
          setCurrentHole((prev) => prev + 1);
        } else {
          const totalScore = Object.values(holeScores).reduce(
            (acc, score) => acc + (parseInt(score) || 0),
            0
          );
          formData.append("totalScore", totalScore);
        }
      } catch (error) {
        console.log("Error in submission", error);
      }

      const holeNumber = swiperRef.current.swiper.activeIndex + 1; // Get the current hole number
      const holeScore = score[holeNumber];
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
    setScore((prev) => ({ ...prev, [holeNumber]: value }));
    console.log(score, "score");
  };
  // calculate total score by converting object values to an array and then reducing the array to a single value
  const finalScore = Object.values(score).reduce(
    (acc, score) => acc + (parseInt(score) || 0),
    0
  );
  console.log(finalScore, "finalScore");

  return (
    <form
      ref={ref}
      // action={async (formData) => {
      //   ref.current?.reset();
      //   // try {
      //   //   await addScore(formData);
      //   //   toast.success("Score submitted successfully");
      //   // } catch (error) {
      //   //   console.error("Error in submission", error);
      //   // }
      // }}
      className="flex flex-col"
    >
      <input type="hidden" name="course" value="Six Foot Bay" />
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
            <SwiperSlide className="border-b-2 border-kobePurple" key={index}>
              <div className="text-kobePurple">
                <h3 className="text-kobePurple">Hole #{hole.number}</h3>
                <p>Par: {hole.par}</p>
                <p>Handicap: {hole.handicap}</p>
                <p>Yardage: {hole.yardage}</p>
                <div className="flex flex-col w-1/2 items-center justify-center m-auto">
                  <label htmlFor="score">Score:</label>
                  <input
                    type="number"
                    id={`score-${hole.number}`}
                    name="holeScore"
                    defaultValue={score[hole.number]}
                    onChange={(e) =>
                      handleScoreChange(hole.number, e.target.value)
                    }
                  />
                  <input type="number" hidden name="holeNumber" defaultValue={hole.number} />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <label htmlFor="totalScore">{`Score: ${finalScore}`}</label>
      <input type="number" name="totalScore" value={finalScore} required />
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
      <button
        type="submit"
        onClick={handleNextSlide}
        className="bg-kobePurple mt-2 w-1/2 m-auto text-kobeWhite py-1 px-2 rounded-lg"
      >
        TESTING BUTTON
      </button>
      {/* <div className="flex justify-center items-center">
        <SubmitButton />
      </div> */}
      <label htmlFor="notes" name="notes" value="notes">
        Notes:
      </label>
      <textarea name="notes" id="notes" defaultValue="notes"></textarea>
    </form>
  );
}
