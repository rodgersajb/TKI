"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { redirect } from "next/navigation";

import toast from "react-hot-toast";

import Link from "next/link";

import { addScore } from "@/app/actions/actions";
import { confirmScoreSubmission } from "@/app/actions/actions";

import SubmitButton from "./submitButton";
import FrontNine from "./front";
import BackNine from "./back";

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

  const [confirmation, setConfirmation] = useState(false);

  const swiperRef = useRef(null);
  const ref = useRef(null);

  // Handlers for buttons
  const handleNextSlide = async (e) => {
    e.preventDefault();
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
      console.log(swiperRef.current.swiper, "swiperRef");

      const holeNumber = currentHole; // Adjusted to reflect the current hole
      // Get the hole score for the current hole
      const holeScore = score[holeNumber]; // Get the score for the current hol
      console.log("Hole Number:", holeNumber, "Hole Score:", holeScore);
      const formData = new FormData();
      formData.append("course", sixFootGolf.name);
      formData.append("holeScore", holeScore); // Send the score for the current hole
      formData.append("holeNumber", holeNumber);

      // Log individual values
      console.log("Form Data:", {
        course: sixFootGolf.name,
        holeScore: holeScore,
        holeNumber: holeNumber,
      });
      try {
        const response = await addScore(formData);
        console.log(response, "RESPONSE");

        setHoleScores((prev) => ({ ...prev, [holeNumber]: holeScore }));

        if (currentHole < sixFootGolf.holes.length) {
          setCurrentHole((prev) => prev + 1);
        } else {
          // const totalScore = Object.values(holeScores).reduce(
          //   (acc, score) => acc + (parseInt(score) || 0),
          //   0
          // );
          // formData.append("totalScore", totalScore);
          // Show confirmation component
          setConfirmation(true);
          swiperRef.current.swiper.slideNext();
        }
      } catch (error) {
        console.log("Error in submission", error);
      }
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
        try {
          await confirmScoreSubmission(formData);
          toast.success("Score submitted successfully");
          setTimeout(async () => {
            window.location.href = "/complete";
          }, 2000);
        } catch (error) {
          console.error("Error in submission", error);
        }
      }}
      className="flex flex-col items-center"
    >
      <input type="hidden" name="course" value="Six Foot Bay" />
      <h2 className="text-center w-full py-2 bg-kobePurple text-kobeWhite text-2xl">
        {sixFootGolf.name}
      </h2>
      <Swiper
        ref={swiperRef}
        slidesPerView={1}
        navigation={false}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        style={{ width: "100%", height: "300px" }}
      >
        {sixFootGolf.holes.map((hole, index) => {
          console.log(hole.par, "hole");
          return (
            <SwiperSlide key={index}>
              <div className="text-kobePurple flex flex-col gap-4 pt-4 ">
                <div
                  style={{ borderRadius: "0.2rem" }}
                  className="w-[95%] m-auto bg-kobeWhite drop-shadow-md flex flex-col items-center"
                >
                  <h3 className="text-kobePurple"> #{hole.number}</h3>

                  <p>Par {hole.par}</p>
                  <div className="flex gap-2">
                    <p>HDCP {hole.handicap}</p>
                    <p> {hole.yardage} Yards</p>
                  </div>
                </div>
                <div className="flex w-[95%] items-center justify-center m-auto bg-kobeWhite rounded drop-shadow-md py-4 gap-2 ">
                  <label htmlFor="score">Score:</label>
                  <input
                    type="number"
                    id={`score-${hole.number}`}
                    name="holeScore"
                    defaultValue={hole.par}
                    className="w-1/6 text-center"
                    onChange={(e) =>
                      handleScoreChange(hole.number, e.target.value)
                    }
                  />
                  <input
                    type="hidden"
                    name="holeNumber"
                    defaultValue={hole.number}
                  />
                </div>
                <div className="flex flex-col w-[95%]  bg-kobeWhite rounded drop-shadow-md m-auto gap-2 ">
                  <label className="text-center" htmlFor="notes" name="notes" value="notes">
                    Notes:
                  </label>
                  <textarea
                    name="notes"
                    id="notes"
                    className="border-none outline-none"
                  ></textarea>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
        <SwiperSlide>
          <div className="flex flex-col items-center gap-4 justify-center w-full">
            <div className="flex flex-col gap-2  w-[90%]">
              <h3 className="pt-4">Does this look right to you?</h3>
              <div className="flex">
                {sixFootGolf.holes
                  .filter((hole) => hole.number <= 9)
                  .map((hole) => (
                    <FrontNine key={hole.number} hole={hole} score={score} />
                  ))}
              </div>
              <div className="flex">
                {sixFootGolf.holes
                  .filter((hole) => hole.number > 9)
                  .map((hole) => (
                    <BackNine key={hole.number} hole={hole} score={score} />
                  ))}
              </div>
            </div>
            {/* <p>Total Score: {finalScore}</p> */}
            <div className="flex justify-center items-center">
              <SubmitButton />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <label htmlFor="totalScore">{`Score: ${finalScore}`}</label>
      <input type="hidden" name="totalScore" value={finalScore} required />
      <div className="flex w-full justify-between px-1">
        <button
          className="bg-kobePurple text-kobeWhite py-1 px-2 rounded-lg"
          type="button"
          onClick={handlePrevSlide}
        >
          Previous Hole
        </button>
        {currentHole < sixFootGolf.holes.length ? (
          <button
            type="button"
            onClick={handleNextSlide}
            className="bg-kobePurple text-kobeWhite py-1 px-2"
          >
            Next Hole
          </button>
        ) : (
          <button
            className="bg-kobeYellow text-kobePurple font-bold py-1 px-2"
            type="button"
            onClick={handleNextSlide}
          >
            Finish & Confirm
          </button>
        )}
      </div>
    </form>
  );
}
