"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import toast from "react-hot-toast";

import { addScore } from "@/app/actions/actions";
import SubmitButton from "../../submit-score/components/submitButton";
import ScoreButton from "@/app/components/scoreButton";

export default function QuarryForm({ quarryGolf }) {
  // useState to keep track of course being played
  const [course, setCourse] = useState(quarryGolf);
  console.log(course);
  const [isQuarryComplete, setIsQuarryComplete] = useState(false);

  const handleSubmit = () => {
    setIsQuarryComplete(true);
  };

  // useState to keep track of score
  const [score, setScore] = useState(
    quarryGolf.holes.reduce((acc, hole) => {
      acc[hole.number] = "";
      return acc;
    }, {})
  );

  const [totalScore, setTotalScore] = useState(0);

  const swiperRef = useRef(null);
  const ref = useRef(null);

  // Handlers for buttons
  const handleNextSlide = async () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
      console.log(swiperRef.current.swiper, "swiperRef");

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
        action={async (formData) => {
          ref.current?.reset();

          ref.current?.reset();
          try {
            await addScore(formData);
            toast.success("Score submitted successfully");
          } catch (error) {
            toast.error("Error in submission", error);
          }
          // input validation

          await addScore(formData);
        }}
        className="flex flex-col"
      >
        
         
            <input type="hidden" name="course" value={quarryGolf.name} />
            <h2>{quarryGolf.name}</h2>
            <Swiper
              ref={swiperRef}
              slidesPerView={1}
              navigation={false}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              style={{ width: "100%", height: "500px" }}
            >
              {quarryGolf.holes.map((hole, index) => {
                return (
                  <SwiperSlide key={index}>
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
                          name="score"
                          defaultValue={score[hole.number]}
                          onChange={(e) =>
                            handleScoreChange(hole.number, e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <label htmlFor="totalScore">{`Score: ${finalScore}`}</label>
            <input
              type="number"
              name="totalScore"
              value={finalScore}
              required
            />
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
            <div className="flex justify-center items-center">
           
              <ScoreButton  />
            </div>
            <label htmlFor="notes" name="notes" value="notes">
              Notes:
            </label>
            <textarea name="notes" id="notes" value="notes"></textarea>
         
      </form>
   
  );
}
