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

const route = [
  {
    label: "Quarry Golf Course",
    href: "/quarry",
  }
]

export default function TestForm({ sixFootGolf, quarryGolf, user, kindeId }) {
  // useState to keep track of course being played
  const [course, setCourse] = useState(sixFootGolf);
  console.log(course)
  const [isSixFootComplete, setIsSixFootComplete] = useState(false);
  
  const handleSubmit = () => {
    setIsSixFootComplete(true);
    
  }

  // useState to keep track of score
  const [score, setScore] = useState(
    sixFootGolf.holes.reduce((acc, hole) => {
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

      // Fetch to update scores
      // const res = await fetch("http://localhost:3000/api/hole-scoring", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     player: kindeId,
      //     course: sixFootGolf.name,
      //     holeNumber,
      //     strokes: holeScore,
      //   }),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      // if (res.ok) {
      //   toast.success("Score updated successfully!");
      // } else {
      //   toast.error("Failed to update score.");
      // }
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
    <>
      <form
        ref={ref}
        action={async (formData) => {
          ref.current?.reset();

          formData.append("totalScore", finalScore);

          const result = await addScore(formData);
          if (result?.error) {
            toast.error(result.error);
          } else {
            toast.success(result.success);
          }
          // input validation

          await addScore(formData);
        }}
        className="flex flex-col"
      >
        {!isSixFootComplete ? (
          <>
            <input type="hidden" name="course" value={sixFootGolf.name} />
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
              {/* <button
            className="bg-kobeYellow text-kobePurple font-bold mt-6 py-2 px-8 rounded-sm"
            onClick={handleSubmit}
          >
            Submit score
          </button> */}
              <SubmitButton />
            </div>
            <label htmlFor="notes" name="notes" value="notes">
              Notes:
            </label>
            <textarea name="notes" id="notes" value="notes"></textarea>
          </>
        ) : (
          <div>
            <h3>Great job, Billy. Now go get after it!</h3>
            <ul>
              {route.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </>
  );
}
